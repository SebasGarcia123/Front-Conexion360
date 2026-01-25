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
  ResponsiveContainer,
} from 'recharts'

interface Building {
  _id: string
  name: string
}

interface ValoracionPorEdificio {
  buildingId: string
  buildingName: string
  averageValoration: number
  count: number
}

export const ValoracionPorEdificio = () => {
  const [data, setData] = useState<ValoracionPorEdificio[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        if (!token) {
          console.error('No hay token, redirigiendo a login')
          return
        }

        const [resData, resBuildings] = await Promise.all([
          axios.get<ValoracionPorEdificio[]>('http://localhost:4000/indicadores/edificios/valoracion', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<Building[]>('http://localhost:4000/buildings', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        setData(resData.data)
        setBuildings(resBuildings.data)
        if (resBuildings.data.length > 0) setSelectedBuilding(resBuildings.data[0]._id)
      } catch (err) {
        console.error('Error cargando datos', err)
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

  if (!data.length || !buildings.length)
    return <Typography>No hay datos para mostrar</Typography>

  // Filtramos la valoración del edificio seleccionado
  const selectedData = data.find(d => d.buildingId === selectedBuilding)

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="h4" mr={1}>Valoración por edificio</Typography>
        <Typography variant="body1">(Promedio de valoraciones)</Typography>
      </Box>

      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Edificio</InputLabel>
        <Select
          value={selectedBuilding}
          label="Edificio"
          onChange={(e) => setSelectedBuilding(e.target.value)}
        >
          {buildings.map(b => (
            <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box width="100%" height={400}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={selectedData ? [selectedData] : []}>
            <XAxis dataKey="buildingName" />
            <YAxis domain={[0, 10]} allowDecimals={false} />
            <Tooltip 
              formatter={(value: number | undefined) => 
                value !== undefined ? value.toFixed(1) : '-'
              } 
            />
            <Bar dataKey="averageValoration" fill="#1976d2" name="Valoración" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
