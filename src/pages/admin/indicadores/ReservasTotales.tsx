import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Box, Typography, CircularProgress } from '@mui/material'
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
   Interfaces
======================= */

interface MonthlyCount {
    month: number
    count: number
}

interface ReservasTotalesAnio {
    year: number
    monthly: MonthlyCount[]
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

function buildChartData(data: ReservasTotalesAnio[]): {
    chartData: ChartRow[]
    years: number[]
} {
    const years = data
        .map((d) => d.year)
        .sort((a, b) => a - b)
        .slice(-5)

    const chartData: ChartRow[] = MONTHS.map((monthName, idx) => {
        const row: ChartRow = { month: monthName }

        years.forEach((year) => (row[year] = 0))

        data.forEach((entry) => {
            const found = entry.monthly.find((m) => m.month === idx + 1)
            if (found && years.includes(entry.year)) {
                row[entry.year] = found.count
            }
        })

        return row
    })

    return { chartData, years }
}

/* =======================
   Componente
======================= */

export const ReservasTotales = () => {
    const [data, setData] = useState<ReservasTotalesAnio[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const res = await axios.get<ReservasTotalesAnio[]>(
                    'http://localhost:4000/indicadores/reservas-totales-por-mes',
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setData(res.data)
            } catch (err) {
                console.error('Error cargando indicador', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const { chartData, years } = useMemo(() => buildChartData(data), [data])

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    if (!data.length) return <Typography>No hay datos para mostrar</Typography>

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h4" mr={1}>
                    Reservas totales por mes
                </Typography>
                <Typography variant="body1">(Últimos 5 años)</Typography>
            </Box>

            <Box width="100%" height={420}>
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
