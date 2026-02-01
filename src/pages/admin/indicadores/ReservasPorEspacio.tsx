import { useEffect, useState } from 'react'
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

interface MonthlyCount {
    month: number
    count: number
}

interface ReservasPorTipoEspacioAnio {
    spaceType: string
    year: number
    monthly: MonthlyCount[]
}

interface ChartRow {
    month: string
    [year: number]: number | string
}

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

const SPACE_TYPES = ['Piso', 'Oficina', 'Escritorio co-working']

const buildChartData = (
    data: ReservasPorTipoEspacioAnio[],
    spaceType: string
): { chartData: ChartRow[]; years: number[] } => {
    const filtered = data.filter((d) => d.spaceType === spaceType)

    const years = Array.from(new Set(filtered.map((d) => d.year)))
        .sort((a, b) => a - b)
        .slice(-5)

    const chartData = MONTHS.map((monthName, idx) => {
        const row: ChartRow = { month: monthName }
        years.forEach((year) => (row[year] = 0))

        filtered.forEach((entry) => {
            const found = entry.monthly.find((m) => m.month === idx + 1)
            if (found && years.includes(entry.year)) {
                row[entry.year] = found.count
            }
        })

        return row
    })

    return { chartData, years }
}
export const ReservasPorEspacio = () => {
    const [data, setData] = useState<ReservasPorTipoEspacioAnio[]>([])
    const [selectedSpaceType, setSelectedSpaceType] = useState<string>(
        SPACE_TYPES[0]
    )
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const res = await axios.get<ReservasPorTipoEspacioAnio[]>(
                    'http://localhost:4000/indicadores/espacios/reservas-por-tipo-por-mes',
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setData(res.data)
            } catch (error) {
                console.error('Error cargando indicador', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    if (!data.length) return <Typography>No hay datos para mostrar</Typography>

    const { chartData, years } = buildChartData(data, selectedSpaceType)

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h4" mr={1}>
                    Reservas por tipo de espacio
                </Typography>
                <Typography variant="body1">
                    (Cantidad de reservas mensuales, excluye las pendientes)
                </Typography>
            </Box>

            <FormControl sx={{ mb: 2, minWidth: 250 }}>
                <InputLabel>Tipo de espacio</InputLabel>
                <Select
                    value={selectedSpaceType}
                    label="Tipo de espacio"
                    onChange={(e) => setSelectedSpaceType(e.target.value)}
                >
                    {SPACE_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box width="100%" height={400}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        {years.map((year, index) => (
                            <Bar
                                key={year}
                                dataKey={year}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}
