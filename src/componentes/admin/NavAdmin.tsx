import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { BotonLogout } from '../BotonLogout'
import { useState } from 'react'

export const NavAdmin = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleNavigate = (path: string) => {
        navigate(path)
        handleClose()
    }

    return (
        <AppBar
            position="static"
            sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
        >
            <Toolbar sx={{ height: 70 }}>
                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo"
                    width="200"
                    style={{ borderRadius: '5px', marginRight: 30 }}
                />

                {/* Links izquierda */}
                <Box sx={{ flexGrow: 1 }}>
                    <Button
                        component={Link}
                        to="/manageUsers"
                        color="inherit"
                        sx={{ mr: 5, fontSize: 15 }}
                    >
                        Administrar Usuarios
                    </Button>

                    {/* 🔽 Nuevo dropdown */}
                    <Button
                        color="inherit"
                        onClick={handleOpen}
                        sx={{
                            mx: 2,
                            fontSize: 15,
                            minWidth: 120,      // 🔹 +50% aprox
                            px: 2,              // padding horizontal
                            justifyContent: 'center',
                        }}
                    >
                        Nuevo
                    </Button>


                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: '#efeaeaff',
                                    color: '#0265baff',
                                    minWidth: 140,   // 🔹 +50% aprox
                                },
                            },
                        }}
                    >

                        <MenuItem
                            sx={{
                                color: '#0265baff',
                                fontSize: 15,
                                '&:hover': {
                                    backgroundColor: '#dcd6d6ff',
                                },
                            }}
                            onClick={() => handleNavigate('/nuevo/edificio')}
                        >
                            EDIFICIO
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            sx={{
                                color: '#0265baff',
                                fontSize: 15,
                                '&:hover': {
                                    backgroundColor: '#dcd6d6ff',
                                },
                            }}
                            onClick={() => handleNavigate('/nuevo/espacio')}
                        >
                            ESPACIO
                        </MenuItem>
                    </Menu>
                    
                    <Button
                        component={Link}
                        to="/estadisticas"
                        color="inherit"
                        sx={{ mr: 3, fontSize: 15 }}
                    >
                        Estadísticas
                    </Button>
                </Box>

                {/* Derecha */}
                <BotonLogout />
            </Toolbar>
        </AppBar>
    )
}
