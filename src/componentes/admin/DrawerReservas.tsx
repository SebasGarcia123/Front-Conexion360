import { Box, List, ListItemButton, ListItemText } from '@mui/material'
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
                <ListItemButton
                    onClick={() => navigate('/indicadores/reservas/totales')}
                >
                    <ListItemText primary="Reservas totales por mes" />
                </ListItemButton>
            </List>
        </Box>
    )
}
