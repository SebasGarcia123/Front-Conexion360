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

interface ReservasPorEdificioAnio {
  buildingId: string
  buildingName: string
  year: number
  monthly: MonthlyCount[]
}

interface Building {
  _id: string
  name: string
}

interface ChartRow {
  month: string
  [year: number]: number | string
}

const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const COLORS = ['#1976d2','#9c27b0','#2e7d32','#ed6c02','#d32f2f']

function buildChartData(
  data: ReservasPorEdificioAnio[],
  buildingId: string
): { chartData: ChartRow[]; years: number[]; buildingName: string } {
  const buildingData = data.filter(d => d.buildingId === buildingId)
  const buildingName = buildingData[0]?.buildingName ?? ''
  const years = Array.from(new Set(buildingData.map(d => d.year)))
    .sort((a,b)=>a-b)
    .slice(-5)

  return {
    buildingName,
    years,
    chartData: MONTHS.map((monthName, idx) => {
      const row: ChartRow = { month: monthName }
      years.forEach(year => row[year] = 0)
      buildingData.forEach(entry => {
        const found = entry.monthly.find(m => m.month === idx + 1)
        if(found && years.includes(entry.year)) row[entry.year] = found.count
      })
      return row
    })
  }
}

export const ReservasPorEdificio = () => {
  const [data, setData] = useState<ReservasPorEdificioAnio[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        if(!token) {
            console.error('No hay token, redirigiendo a login');
            return;
            }
        const [resData, resBuildings] = await Promise.all([
          axios.get<ReservasPorEdificioAnio[]>('http://localhost:4000/indicadores/edificios/reservas-por-mes', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<Building[]>('http://localhost:4000/buildings', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])
        setData(resData.data)
        setBuildings(resBuildings.data)
        if(resBuildings.data.length > 0) setSelectedBuilding(resBuildings.data[0]._id)
      } catch(err) {
        console.error('Error cargando datos', err)
      } finally { setLoading(false) }
    }

    fetchData()
  }, [])

  if(loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress/></Box>
  if(!data.length || !buildings.length) return <Typography>No hay datos para mostrar</Typography>

  const { chartData, years } = buildChartData(data, selectedBuilding)

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="h4" mr={1}>
            Reservas por mes
        </Typography>
        <Typography variant="body1">
            (Cantidad de reservas por edificio por mes)
        </Typography>
        </Box>

      <FormControl sx={{ mb:2, minWidth:200 }}>
        <InputLabel>Edificio</InputLabel>
        <Select
          value={selectedBuilding}
          label="Edificio"
          onChange={(e)=>setSelectedBuilding(e.target.value)}
        >
          {buildings.map(b => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
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
              <Bar key={year} dataKey={year} fill={COLORS[index % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

