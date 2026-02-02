import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, CircularProgress, Typography } from '@mui/material'
import { NavAdmin } from '../../componentes/admin/NavAdmin'
import { Footer } from '../../componentes/Footer'
import { CardCrearEspacio } from '../../componentes/admin/CardCrearEspacio'
import { useNavigate } from 'react-router-dom'
import type { ISpaceAdmin } from '../../types'
import { CardEspacio } from '../../componentes/admin/CardEspacio'

export const Espacios = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [spaces, setSpaces] = useState<ISpaceAdmin[]>([])


  const navigate = useNavigate()

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        if (!token) return

        const { data } = await axios.get<ISpaceAdmin[]>(
          'http://localhost:4000/spaces/admin',
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setSpaces(data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los espacios')
      } finally {
        setLoading(false)
      }
    }

    fetchSpaces()
  }, [])

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavAdmin />

      <Box flexGrow={1} px={4} py={3}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Espacios
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
            {spaces.map((space) => (
              <CardEspacio
                key={space._id}
                imageUrl={space.pictureUrl}
                buildingName={space.building.name}
                address={space.building.address}
                city={space.building.city}
                capacity={space.capacity}
                isActive={space.isActive}
                pricePerDay={space.pricePerDay}
                onEdit={() => navigate(`/editar/espacio/${space._id}`)}
                />

            ))}

            <CardCrearEspacio
              onClick={() => navigate('/nuevo/espacio')}
            />
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  )
}
