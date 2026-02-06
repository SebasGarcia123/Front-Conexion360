import { Box, Typography, IconButton, Stack, Link } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

export const ContactoConexion360 = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        py: 6,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Michroma',
          fontWeight: 600,
          mb: 2,
        }}
      >
        Contacto Conexión 360°
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
        Seguinos en nuestras redes o comunicate con nosotros
      </Typography>

      {/* Redes sociales */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <IconButton
          component={Link}
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <InstagramIcon fontSize="large" />
        </IconButton>

        <IconButton
          component={Link}
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <FacebookIcon fontSize="large" />
        </IconButton>

        <IconButton
          component={Link}
          href="https://wa.me/5491112345678"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* Datos de contacto */}
      <Stack spacing={2} alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon />
          <Typography variant="body1">+54 9 11 1234-5678</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon />
          <Typography variant="body1">
            contacto@conexion360.com
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
