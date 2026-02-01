import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Typography,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

/* =======================
   Tipos
======================= */

interface Building {
    _id: string
    name: string
}

interface MonthlyTotal {
    month: number
    total: number
}

interface FacturacionPorEdificioAnio {
    buildingId: string
    buildingName: string
    year: number
    monthly: MonthlyTotal[]
}

interface ChartRow {
    month: string
    [year: number]: number | string
}

/* =======================
   Constantes
======================= */

const MONTHS = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
]

const COLORS = ['#1976d2', '#9c27b0', '#2e7d32', '#ed6c02', '#d32f2f']

/* =======================
   Función pura
======================= */

function buildChartData(
    data: FacturacionPorEdificioAnio[],
    buildingId: string
): { chartData: ChartRow[]; years: number[]; buildingName: string } {
    const filtered = data.filter((d) => d.buildingId === buildingId)
    const buildingName = filtered[0]?.buildingName ?? ''

    const years = Array.from(new Set(filtered.map((d) => d.year)))
        .sort((a, b) => a - b)
        .slice(-5)

    const chartData: ChartRow[] = MONTHS.map((monthName, idx) => {
        const row: ChartRow = { month: monthName }
        years.forEach((year) => (row[year] = 0))

        filtered.forEach((entry) => {
            const found = entry.monthly.find((m) => m.month === idx + 1)
            if (found && years.includes(entry.year)) {
                row[entry.year] = found.total
            }
        })

        return row
    })

    return { chartData, years, buildingName }
}

/* =======================
   Componente
======================= */

export const FacturacionPorEdificio = () => {
    const [data, setData] = useState<FacturacionPorEdificioAnio[]>([])
    const [buildings, setBuildings] = useState<Building[]>([])
    const [selectedBuilding, setSelectedBuilding] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const [resData, resBuildings] = await Promise.all([
                    axios.get<FacturacionPorEdificioAnio[]>(
                        'http://localhost:4000/indicadores/facturacion-mensual-edificio',
                        { headers: { Authorization: `Bearer ${token}` } }
                    ),
                    axios.get<Building[]>('http://localhost:4000/buildings', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ])

                setData(resData.data)
                setBuildings(resBuildings.data)

                if (resBuildings.data.length > 0) {
                    setSelectedBuilding(resBuildings.data[0]._id)
                }
            } catch (err) {
                console.error('Error cargando facturación', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const { chartData, years, buildingName } = useMemo(
        () => buildChartData(data, selectedBuilding),
        [data, selectedBuilding]
    )

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    if (!data.length || !buildings.length)
        return <Typography>No hay datos para mostrar</Typography>

    return (
        <Box>
            <Box display="flex" justifyContent="center" mb={2}>
                <Typography variant="h4">Facturación mensual</Typography>
            </Box>

            <FormControl sx={{ mb: 3, minWidth: 260 }}>
                <InputLabel>Edificio</InputLabel>
                <Select
                    value={selectedBuilding}
                    label="Edificio"
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                >
                    {buildings.map((b) => (
                        <MenuItem key={b._id} value={b._id}>
                            {b.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="h6" mb={2}>
                {buildingName}
            </Typography>

            <Box width="100%" height={420}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {years.map((year, index) => (
                            <Bar
                                key={year}
                                dataKey={year}
                                name={String(year)}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}
