import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/logo.png'
import { BotonLogout } from '../BotonLogout'

const drawerTextStyle = {
  color: '#0265baff',
  fontSize: 15,
}

export const NavAdmin = () => {
  const [anchorNuevo, setAnchorNuevo] = useState<null | HTMLElement>(null)
  const [anchorIndicadores, setAnchorIndicadores] = useState<null | HTMLElement>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const navigate = useNavigate()

  const openNuevo = Boolean(anchorNuevo)
  const openIndicadores = Boolean(anchorIndicadores)

  const handleOpenNuevo = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorNuevo(e.currentTarget)

  const handleOpenIndicadores = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorIndicadores(e.currentTarget)

  const handleCloseNuevo = () => setAnchorNuevo(null)
  const handleCloseIndicadores = () => setAnchorIndicadores(null)

  const handleNavigate = (path: string, close?: () => void) => {
    navigate(path)
    close?.()
    setOpenDrawer(false)
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{ px: 2, backgroundColor: '#efeaeaff', color: '#0265baff' }}
      >
        <Toolbar sx={{ height: 70 }}>
          {/* ☰ Mobile */}
          <IconButton
            onClick={() => setOpenDrawer(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            width="200"
            style={{ borderRadius: 5, marginRight: 30 }}
          />

          {/* MENÚ DESKTOP */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Button
              component={Link}
              to="/manageUsers"
              color="inherit"
              sx={{ mr: 5, fontSize: 15 }}
            >
              Administrar Usuarios
            </Button>

            {/* Nuevo */}
            <Button onClick={handleOpenNuevo} sx={{ mx: 2, fontSize: 15 }}>
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
        minWidth: 140,
      },
    },
  }}
>
              <MenuItem onClick={() => handleNavigate('/nuevo/edificio', handleCloseNuevo)}>
                EDIFICIO
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/nuevo/espacio', handleCloseNuevo)}>
                ESPACIO
              </MenuItem>
            </Menu>

            {/* Indicadores */}
            <Button onClick={handleOpenIndicadores} sx={{ mx: 2, fontSize: 15 }}>
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
        minWidth: 140,
      },
    },
  }}
>

              <MenuItem onClick={() => handleNavigate('/indicadores/edificios', handleCloseIndicadores)}>
                EDIFICIOS
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/indicadores/espacios', handleCloseIndicadores)}>
                ESPACIOS
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/indicadores/reservas', handleCloseIndicadores)}>
                RESERVAS
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleNavigate('/indicadores/negocio', handleCloseIndicadores)}>
                NEGOCIO
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <BotonLogout />
        </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#efeaeaff',
            color: '#0265baff',
          },
        }}
      >
        <Box sx={{ width: 260 }}>
          {/* Logo arriba */}
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <img src={logo} alt="Logo" width="180" />
          </Box>

          <Divider />

          <List>
            <ListItemButton onClick={() => handleNavigate('/manageUsers')}>
              <ListItemText primary="Administrar Usuarios" sx={drawerTextStyle} />
            </ListItemButton>

            <Divider />

            <ListItemButton onClick={() => handleNavigate('/nuevo/edificio')}>
              <ListItemText primary="Nuevo · Edificio" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/nuevo/espacio')}>
              <ListItemText primary="Nuevo · Espacio" sx={drawerTextStyle} />
            </ListItemButton>

            <Divider />

            <ListItemButton onClick={() => handleNavigate('/indicadores/edificios')}>
              <ListItemText primary="Indicadores · Edificios" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/indicadores/espacios')}>
              <ListItemText primary="Indicadores · Espacios" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/indicadores/reservas')}>
              <ListItemText primary="Indicadores · Reservas" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/indicadores/negocio')}>
              <ListItemText primary="Indicadores · Negocio" sx={drawerTextStyle} />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            {/* Logout SOLO mobile */}
            <ListItemButton>
              <BotonLogout />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

