import { Box, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const DrawerEdificios = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#0d47a1',
        color: 'white',
        pt: 2,
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate('/indicadores/edificios')}>
          <ListItemText primary="Reservas por edificio" />
        </ListItemButton>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

        <ListItemButton onClick={() => navigate('/indicadores/espacios')}>
          <ListItemText primary="Indicadores de espacios" />
        </ListItemButton>
      </List>
    </Box>
  )
}

