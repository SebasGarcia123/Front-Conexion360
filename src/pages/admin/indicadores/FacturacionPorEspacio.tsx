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

interface MonthlyTotal {
    month: number
    total: number
}

interface FacturacionPorTipoAnio {
    spaceType: string
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

const SPACE_TYPES = ['Piso', 'Oficina', 'Escritorio co-working'] as const

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
    data: FacturacionPorTipoAnio[],
    selectedType: string
): { chartData: ChartRow[]; years: number[] } {
    const filtered = data.filter((d) => d.spaceType === selectedType)

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

    return { chartData, years }
}

/* =======================
   Componente
======================= */

export const FacturacionPorEspacio = () => {
    const [data, setData] = useState<FacturacionPorTipoAnio[]>([])
    const [selectedType, setSelectedType] = useState<string>(SPACE_TYPES[0])
    const [loading, setLoading] = useState(true)

    /* -------- Carga inicial -------- */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const res = await axios.get<FacturacionPorTipoAnio[]>(
                    'http://localhost:4000/indicadores/facturacion-por-tipo-espacio',
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setData(res.data)
            } catch (err) {
                console.error('Error cargando facturación', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    /* -------- Memo -------- */

    const { chartData, years } = useMemo(
        () => buildChartData(data, selectedType),
        [data, selectedType]
    )

    /* -------- Estados -------- */

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    if (!data.length) return <Typography>No hay datos para mostrar</Typography>

    /* -------- Render -------- */

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h4" mr={1}>
                    Facturación mensual
                </Typography>
                <Typography variant="body1">(por tipo de espacio)</Typography>
            </Box>

            <FormControl sx={{ mb: 3, minWidth: 260 }}>
                <InputLabel>Tipo de espacio</InputLabel>
                <Select
                    value={selectedType}
                    label="Tipo de espacio"
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {SPACE_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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
