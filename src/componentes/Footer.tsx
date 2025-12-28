import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'grey.900',
                color: '#0265baff',
                textAlign: 'center',
                py: 3,
                backgroundColor: '#efeaeaff',
                //width: '100%',
                height: '10vh',
            }}
        >
            <Typography variant="body2">
                © 2025 Conexión 360 - Todos los derechos reservados
            </Typography>
        </Box>
    )
}
