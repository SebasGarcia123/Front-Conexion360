import { AppBar, Toolbar, Button, Box } from '@mui/material'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export const BarraSuperior = () => {

    const navigate = useNavigate()

    const handleBack = () => {
    if (window.history.length > 1) {
        navigate(-1)
    } else {
        navigate('/', { replace: true })
    }
}

    return (
        <AppBar
            position="static"
            sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
        >
            <Toolbar sx={{ height: 70, alignItems: 'center' }}>
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
                    onClick={handleBack}
                    variant="contained"
                >
                    Volver
                </Button>
            </Toolbar>
        </AppBar>
    )
}
