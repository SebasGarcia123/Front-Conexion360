import { Box, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const DrawerReservas = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#2196f3',
        color: 'white',
        pt: 2,
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate('/indicadores/reservas/promedio-edificio')}>
          <ListItemText primary="Promedio de reservas por edificio" />
        </ListItemButton>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

        <ListItemButton onClick={() => navigate('/indicadores/reservas/promedio-espacio')}>
          <ListItemText primary="Promedio de reservas por espacio" />
        </ListItemButton>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

        <ListItemButton onClick={() => navigate('/indicadores/reservas/mejor-valorada')}>
          <ListItemText primary="Reserva mejor valorada por mes" />
        </ListItemButton>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

        <ListItemButton onClick={() => navigate('/indicadores/reservas/totales')}>
          <ListItemText primary="Reservas totales por mes" />
        </ListItemButton>
      </List>
    </Box>
  )
}