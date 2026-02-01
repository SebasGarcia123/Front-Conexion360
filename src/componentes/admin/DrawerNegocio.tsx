import { Box, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const DrawerNegocio = () => {
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
                    onClick={() => navigate('/indicadores/negocio/espacio')}
                >
                    <ListItemText primary="Facturacion por espacio" />
                </ListItemButton>

                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

                <ListItemButton
                    onClick={() => navigate('/indicadores/negocio/edificio')}
                >
                    <ListItemText primary="Facturacion por edificio" />
                </ListItemButton>

                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

                <ListItemButton
                    onClick={() => navigate('/indicadores/negocio/total')}
                >
                    <ListItemText primary="Facturacion total" />
                </ListItemButton>
            </List>
        </Box>
    )
}
