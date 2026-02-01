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
   Tipos
======================= */

interface MonthlyTotal {
    month: number
    total: number
}

interface FacturacionTotalAnio {
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

function buildChartData(data: FacturacionTotalAnio[]): {
    chartData: ChartRow[]
    years: number[]
} {
    const years = Array.from(new Set(data.map((d) => d.year)))
        .sort((a, b) => a - b)
        .slice(-5)

    const chartData: ChartRow[] = MONTHS.map((monthName, idx) => {
        const row: ChartRow = { month: monthName }

        years.forEach((year) => (row[year] = 0))

        data.forEach((entry) => {
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

export const FacturacionTotal = () => {
    const [data, setData] = useState<FacturacionTotalAnio[]>([])
    const [loading, setLoading] = useState(true)

    /* -------- Carga -------- */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const res = await axios.get<FacturacionTotalAnio[]>(
                    'http://localhost:4000/indicadores/facturacion-total-mensual',
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setData(res.data)
            } catch (err) {
                console.error('Error cargando facturación total', err)
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
            <Box display="flex" justifyContent="center" mb={2}>
                <Typography variant="h4">Facturación total mensual</Typography>
            </Box>

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
