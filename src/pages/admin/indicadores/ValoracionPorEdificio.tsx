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

interface Building {
  _id: string
  name: string
}

interface MonthlyValoration {
  month: number
  averageValoration: number
}

interface ValoracionPorEdificioAnio {
  buildingId: string
  buildingName: string
  year: number
  monthly: MonthlyValoration[]
}

interface ChartRow {
  month: string
  [year: number]: number | string
}

/* =======================
   Constantes
======================= */

const MONTHS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const COLORS = ['#1976d2', '#9c27b0', '#2e7d32', '#ed6c02', '#d32f2f']

/* =======================
   Helper funcional
======================= */

function buildChartData(
  data: ValoracionPorEdificioAnio[],
  buildingId: string
): { chartData: ChartRow[]; years: number[]; buildingName: string } {

  console.log('🧮 buildChartData called')
  console.log('➡️ buildingId seleccionado:', buildingId)
  console.log(
    '➡️ buildingIds disponibles:',
    data.map(d => d.buildingId)
  )

  const buildingData = data.filter(
    d => String(d.buildingId) === String(buildingId)
  )

  console.log('➡️ buildingData filtrado:', buildingData)

  if (!buildingData.length) {
    console.warn('⚠️ No hay datos para este edificio')
    return { chartData: [], years: [], buildingName: '' }
  }

  const buildingName = buildingData[0].buildingName

  const years = Array.from(new Set(buildingData.map(d => d.year)))
    .sort((a, b) => a - b)
    .slice(-5)

  console.log('➡️ años detectados:', years)

  const chartData: ChartRow[] = MONTHS.map((monthName, idx) => {
    const row: ChartRow = { month: monthName }

    years.forEach(year => (row[year] = 0))

    buildingData.forEach(entry => {
      const found = entry.monthly.find(m => m.month === idx + 1)
      if (found && years.includes(entry.year)) {
        row[entry.year] = found.averageValoration * 2
      }
    })

    return row
  })

  console.log('➡️ chartData final:', chartData)

  return { chartData, years, buildingName }
}

/* =======================
   Componente
======================= */

export const ValoracionPorEdificio = () => {
  console.log('🟢 RENDER ValoracionPorEdificio')

  const [data, setData] = useState<ValoracionPorEdificioAnio[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState('')
  const [loading, setLoading] = useState(true)

  /* -------- Carga inicial -------- */

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        if (!token) {
          console.error('❌ No hay token')
          return
        }

        console.log('📡 Fetching data...')

        const [resData, resBuildings] = await Promise.all([
          axios.get<ValoracionPorEdificioAnio[]>(
            'http://localhost:4000/indicadores/edificios/valoracion-mensual',
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get<Building[]>(
            'http://localhost:4000/buildings',
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ])

        console.log('✅ Data indicadores:', resData.data)
        console.log('✅ Buildings:', resBuildings.data)

        setData(resData.data)
        setBuildings(resBuildings.data)

        if (resBuildings.data.length > 0) {
          console.log(
            '🏢 selectedBuilding inicial:',
            resBuildings.data[0]._id
          )
          setSelectedBuilding(resBuildings.data[0]._id)
        }
      } catch (err) {
        console.error('❌ Error cargando datos', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  /* -------- Datos del gráfico -------- */

  const { chartData, years, buildingName } = useMemo(() => {
    console.log('🔁 useMemo recalculando')
    return buildChartData(data, selectedBuilding)
  }, [data, selectedBuilding])

  /* -------- Estados visuales -------- */

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )

  if (!data.length || !buildings.length)
    return <Typography>No hay datos para mostrar</Typography>

  /* -------- Render -------- */

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="h4" mr={1}>
          Valoración mensual
        </Typography>
        <Typography variant="body1">
          (Promedio por edificio · escala 0–10)
        </Typography>
      </Box>

      <FormControl sx={{ mb: 3, minWidth: 240 }}>
        <InputLabel>Edificio</InputLabel>
        <Select
          value={selectedBuilding}
          label="Edificio"
          onChange={e => {
            console.log('🏢 Cambio edificio:', e.target.value)
            setSelectedBuilding(e.target.value)
          }}
        >
          {buildings.map(b => (
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
