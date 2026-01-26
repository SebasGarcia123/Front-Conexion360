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
    const [anchorNuevo, setAnchorNuevo] = useState<null | HTMLElement>(null)
    const [anchorIndicadores, setAnchorIndicadores] = useState<null | HTMLElement>(null)

    const openNuevo = Boolean(anchorNuevo)
    const openIndicadores = Boolean(anchorIndicadores)

    const navigate = useNavigate()

    const handleOpenNuevo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNuevo(e.currentTarget)
    }

    const handleOpenIndicadores = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorIndicadores(e.currentTarget)
    }

    const handleCloseNuevo = () => setAnchorNuevo(null)
    const handleCloseIndicadores = () => setAnchorIndicadores(null)


    const handleNavigate = (path: string, close: () => void) => {
        navigate(path)
        close()
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
                        onClick={handleOpenNuevo}
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
                        anchorEl={anchorNuevo}
                        open={openNuevo}
                        onClose={handleCloseNuevo}
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
                            onClick={() => handleNavigate('/nuevo/edificio', handleCloseNuevo)}
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
                            onClick={() => handleNavigate('/nuevo/espacio', handleCloseNuevo)}
                        >
                            ESPACIO
                        </MenuItem>
                    </Menu>
                    
                    {/* Estadisticas e indicadores */}

                    <Button
                        color="inherit"
                        onClick={handleOpenIndicadores}
                        sx={{
                            mx: 2,
                            fontSize: 15,
                            minWidth: 120,      // 🔹 +50% aprox
                            px: 2,              // padding horizontal
                            justifyContent: 'center',
                        }}
                    >
                        Indicadores
                    </Button>


                    <Menu
                        anchorEl={anchorIndicadores}
                        open={openIndicadores}
                        onClose={handleCloseIndicadores}
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
                            onClick={() => handleNavigate('/indicadores/edificios', handleCloseIndicadores)}
                        >
                            EDIFICIOS
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
                            onClick={() => handleNavigate('/indicadores/espacios', handleCloseIndicadores)}
                        >
                            ESPACIOS
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
                            onClick={() => handleNavigate('/indicadores/reservas', handleCloseIndicadores)}
                        >
                            RESERVAS
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
                            onClick={() => handleNavigate('/indicadores/negocio', handleCloseIndicadores)}
                        >
                            NEGOCIO
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Derecha */}
                <BotonLogout />
            </Toolbar>
        </AppBar>
    )
}
