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
   Interfaces
======================= */
interface SpaceTypeOption {
    _id: string
    name: string
}

interface MonthlyValoration {
    month: number
    averageValoration: number
}

interface ValoracionPorTipoAnio {
    spaceType: string
    year: number
    monthly: MonthlyValoration[]
}

interface ChartRow {
    month: string
    [year: number]: number
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

// Tipos de espacio hardcodeados
const SPACE_TYPES: SpaceTypeOption[] = [
    { _id: 'Piso', name: 'Piso' },
    { _id: 'Oficina', name: 'Oficina' },
    { _id: 'Escritorio co-working', name: 'Escritorio co-working' },
]

/* =======================
   Función pura para chart
======================= */
const buildChartData = (
    data: ValoracionPorTipoAnio[],
    selectedType: string
): { chartData: ChartRow[]; years: number[] } => {
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
                row[entry.year] = found.averageValoration
            }
        })
        return row
    })

    return { chartData, years }
}

/* =======================
   Componente funcional
======================= */
export const ValoracionPorEspacio = () => {
    const [data, setData] = useState<ValoracionPorTipoAnio[]>([])
    const [selectedType, setSelectedType] = useState(SPACE_TYPES[0]._id)
    const [loading, setLoading] = useState(true)

    /* -------- Carga inicial -------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                if (!token) return

                const res = await axios.get<ValoracionPorTipoAnio[]>(
                    'http://localhost:4000/indicadores/espacios/promedio-valoracion-mensual',
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setData(res.data)
            } catch (err) {
                console.error('Error cargando datos', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    /* -------- Datos para gráfico -------- */
    const { chartData, years } = useMemo(
        () => buildChartData(data, selectedType),
        [data, selectedType]
    )

    /* -------- Render -------- */
    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    if (!data.length) return <Typography>No hay datos para mostrar</Typography>

    return (
        <Box>
            <Typography variant="h4" mb={2}>
                Valoración mensual por tipo de espacio
            </Typography>

            <FormControl sx={{ mb: 3, minWidth: 240 }}>
                <InputLabel>Tipo de espacio</InputLabel>
                <Select
                    value={selectedType}
                    label="Tipo de espacio"
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {SPACE_TYPES.map((t) => (
                        <MenuItem key={t._id} value={t._id}>
                            {t.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box width="100%" height={420}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 10]} />
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
