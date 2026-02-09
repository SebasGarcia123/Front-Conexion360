import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, CircularProgress, Typography } from '@mui/material'
import { NavAdmin } from '../../componentes/admin/NavAdmin'
import { Footer } from '../../componentes/Footer'
import { CardEdificio } from '../../componentes/admin/CardEdificio'
import { CardCrearEdificio } from '../../componentes/admin/CardCrearEdificio'
import { useNavigate } from 'react-router-dom'

interface Building {
  _id: string
  name: string
  address: string
  city: string
  country: string
  urlImage: string
  isActive: boolean
}

export const Edificios = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const fetchBuildings = async () => {
    try {
      const token = sessionStorage.getItem('authToken')
      if (!token) return

      const { data } = await axios.get<Building[]>(
        'http://localhost:4000/buildings/admin',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setBuildings(data)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los edificios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuildings()
  }, [])

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavAdmin />

      <Box flexGrow={1} px={4} py={3}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Edificios
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {buildings.map((b) => (
              <CardEdificio
                key={b._id}
                id={b._id}
                urlImage={b.urlImage}
                name={b.name}
                address={b.address}
                city={b.city}
                country={b.country}
                isActive={b.isActive}
                onUpdated={fetchBuildings}
              />
            ))}

            <CardCrearEdificio
              onClick={() => navigate('/nuevo/edificio')}
            />
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  )
}
