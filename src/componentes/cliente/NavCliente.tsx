import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/logo.png'
import { BotonLogout } from './../BotonLogout'

const drawerTextStyle = {
  color: '#0265baff',
  fontSize: 15,
}

export const NavCliente = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
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
              to="/editarPerfil"
              color="inherit"
              sx={{ mr: 3, fontSize: 15 }}
            >
              Mi perfil
            </Button>

            <Button
              component={Link}
              to="/mis-reservas"
              color="inherit"
              sx={{ mr: 3, fontSize: 15 }}
            >
              Mis reservas
            </Button>

            <Button
              component={Link}
              to="/espacios"
              color="inherit"
              sx={{ mr: 3, fontSize: 15 }}
            >
              Reservar
            </Button>
          </Box>

          {/* Logout SOLO desktop */}
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
            <ListItemButton onClick={() => handleNavigate('/editarPerfil')}>
              <ListItemText primary="Mi perfil" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/mis-reservas')}>
              <ListItemText primary="Mis reservas" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/espacios')}>
              <ListItemText primary="Reservar" sx={drawerTextStyle} />
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

