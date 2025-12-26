import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export const NavInicio = () => {
    return (
        <AppBar position="static" sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}>
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
                    <Button component={Link} to="/ubicaciones" color="inherit">
                        Ubicaciones
                    </Button>
                    <Button component={Link} to="/soluciones" color="inherit">
                        Soluciones
                    </Button>
                    <Button
                        component={Link}
                        to="/grandes-empresas"
                        color="inherit"
                    >
                        Grandes empresas
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
