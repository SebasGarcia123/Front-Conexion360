import { AppBar, Toolbar, Button, Box } from '@mui/material'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export const BarraSuperior = () => {
    const navigate = useNavigate()

    return (
        <AppBar
            position="static"
            sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
        >
            <Toolbar sx={{ height: 70, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    {/* Logo */}
                    <img
                        src={logo}
                        alt="Logo"
                        width="200"
                        style={{ borderRadius: '5px' }}
                    />
                </Box>
                <Button
                    color="primary"
                    onClick={() => navigate('/', { replace: true })}
                    variant="contained"
                >
                    Volver
                </Button>
            </Toolbar>
        </AppBar>
    )
}
