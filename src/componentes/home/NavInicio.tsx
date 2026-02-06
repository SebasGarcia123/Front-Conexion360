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
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/logo.png'

const drawerTextStyle = {
  color: '#0265baff',
  fontSize: 15,
}

export const NavInicio = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <AppBar
        position="fixed"
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
            width="180"
            style={{ borderRadius: 5, marginRight: 30 }}
          />

          {/* MENÚ DESKTOP */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
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
            <Button href="#contacto" color="inherit">
              Contacto
            </Button>
          </Box>

          {/* BOTONES DERECHA (desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              to="/login"
              color="primary"
              variant="contained"
            >
              Iniciar Sesión
            </Button>
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
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <img src={logo} alt="Logo" width="160" />
          </Box>

          <Divider />

          <List>
            <ListItemButton
              component="a"
              href="#soluciones"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Soluciones" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton
              component="a"
              href="#opiniones"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Opiniones" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton
              component="a"
              href="#ubicaciones"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Ubicaciones" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton
              component="a"
              href="#servicios"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Servicios" sx={drawerTextStyle} />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListItemButton
              component={Link}
              to="/registro"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Registrarse" sx={drawerTextStyle} />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/login"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary="Iniciar Sesión" sx={drawerTextStyle} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
