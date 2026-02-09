import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestoreIcon from '@mui/icons-material/Restore'
import axios from 'axios'

interface CardEdificioProps {
  id: string
  urlImage: string
  name: string
  address: string
  city: string
  country: string
  isActive: boolean
  onUpdated?: () => void
}

export const CardEdificio = ({
  id,
  urlImage,
  name,
  address,
  city,
  country,
  isActive,
  onUpdated,
}: CardEdificioProps) => {

  const token = sessionStorage.getItem('authToken')

  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      `¿Seguro que querés desactivar el edificio "${name}"?`
    )
    if (!confirmed) return

    try {
      await axios.delete(
        `http://localhost:4000/buildings/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onUpdated?.()
    } catch (error) {
      console.error(error)
      alert('No se pudo desactivar el edificio')
    }
  }

  const handleReactivate = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/buildings/${id}/reactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onUpdated?.()
    } catch (error) {
      console.error(error)
      alert('No se pudo reactivar el edificio')
    }
  }

  return (
    <Card
      sx={{
        width: '8cm',
        height: '10.5cm',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',

        // 👇 SOLO ESTO ES NUEVO
        opacity: isActive ? 1 : 0.5,
        filter: isActive ? 'none' : 'grayscale(100%)',

        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
          opacity: isActive ? 1 : 0.7,
        },

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={urlImage}
        alt={name}
        sx={{ height: '60%', objectFit: 'cover' }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {address}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {city}, {country}
          </Typography>
        </Box>

        {/* 👇 MISMO LUGAR, MISMO TAMAÑO */}
        {isActive ? (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleDeactivate}
            sx={{ mt: 3, width: '120px' }}
          >
            Eliminar
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="success"
            startIcon={<RestoreIcon />}
            onClick={handleReactivate}
            sx={{ mt: 3, width: '120px' }}
          >
            Reactivar
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
