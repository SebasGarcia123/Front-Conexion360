import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { BotonLogout } from './BotonLogout'

export const NavCliente = () => {
    return (
        <AppBar
            position="static"
            sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
        >
            <Toolbar sx={{ height: 70, alignItems: 'center' }}>
                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo"
                    width="200"
                    style={{ borderRadius: '5px', marginRight: 30 }}
                />

                {/* Links izquierda */}
                <Box sx={{ flexGrow: 1, marginRight: 3 }}>
                    <Button
                        component={Link}
                        to="/mis-reservas"
                        color="inherit"
                        sx={{ marginRight: 3, fontSize: 15 }}
                    >
                        Mis reservas
                    </Button>
                    <Button
                        component={Link}
                        to="/espacios"
                        color="inherit"
                        sx={{ marginRight: 3, fontSize: 15 }}
                    >
                        Reservar
                    </Button>
                </Box>

                {/* Links derecha */}
                <BotonLogout />
            </Toolbar>
        </AppBar>
    )
}
