import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export const NavInicio = () => {
    return (
        <AppBar
            position="fixed"
            sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
        >
            <Toolbar sx={{ height: 70, alignItems: 'center' }}>
                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo"
                    width="180"
                    style={{ borderRadius: '5px', marginRight: 30 }}
                />
                {/* </Button> */}
                {/* Links izquierda */}
                <Box sx={{ flexGrow: 1 }}>
                    <Button href="#soluciones" color="inherit">
                        Soluciones
                    </Button>
                    <Button href="#opiniones" color="inherit">
                        Opiniones
                    </Button>
                    <Button href="#ubicaciones" color="inherit">
                        Ubicaciones
                    </Button>
                    <Button href="#servicios" color="inherit">
                        Servicios
                    </Button>
                </Box>

                {/* Links derecha */}
                <Button
                    component={Link}
                    to="/registro"
                    color="primary"
                    variant="outlined"
                    sx={{ mr: 2, backgroundColor: '#fafafa' }}
                >
                    Registrarse
                </Button>
                <Button
                    component={Link}
                    to="/Login"
                    color="primary"
                    variant="contained"
                >
                    Iniciar Sesión
                </Button>
            </Toolbar>
        </AppBar>
    )
}
