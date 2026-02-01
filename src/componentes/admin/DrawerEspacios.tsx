import { Box, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const DrawerEspacios = () => {
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
                <ListItemButton
                    onClick={() => navigate('/indicadores/espacios/reservas')}
                >
                    <ListItemText primary="Reservas por espacio" />
                </ListItemButton>

                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

                <ListItemButton
                    onClick={() => navigate('/indicadores/espacios/valoracion')}
                >
                    <ListItemText primary="Valoracion por espacio" />
                </ListItemButton>
            </List>
        </Box>
    )
}
