import { Box, Button, TextField, Typography } from '@mui/material'
import fondo from '../assets/fondo-login.jpg'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarraSuperior } from '../componentes/BarraSuperior'
import { Footer } from '../componentes/Footer'

interface LoginErrorResponse {
  message: string
}


export const Login = () => {
  const [objData, setObjData] = useState({ user: '', password: '' })
  const [userError, setUserError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [generalError, setGeneralError] = useState('')

  const navigate = useNavigate()

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setObjData({ ...objData, [name]: value })

    if (name === 'user') setUserError('')
    if (name === 'password') setPasswordError('')
    setGeneralError('')
  }

  const senData = async () => {
  try {
    const { data } = await axios.post(
      'http://localhost:4000/login',
      objData
    )

    sessionStorage.setItem('authToken', data.token)

    if (data.user.role === 'cliente') {
      navigate('/cliente', { replace: true })
    }

    if (data.user.role === 'admin') {
      navigate('/admin', { replace: true })
    }
  } catch (error) {
    // limpiar errores previos
    setUserError('')
    setPasswordError('')
    setGeneralError('')

    const err = error as AxiosError<LoginErrorResponse>

    // error de red (no llegó al backend)
    if (!err.response) {
      setGeneralError('No se pudo conectar con el servidor')
      return
    }

    const message = err.response.data?.message

    console.log('STATUS:', err.response.status)
    console.log('DATA:', err.response.data)
    console.log('MESSAGE:', err.response.data?.message)


    if (message === 'Usuario no existe') {
      setUserError('El usuario no existe')
      return
    }

    if (message === 'Contraseña incorrecta') {
      setPasswordError('La contraseña es incorrecta')
      return
    }

    if (message === 'Usuario inactivo') {
      setGeneralError(
        'Su usuario se encuentra inactivo. Póngase en contacto con nosotros para reactivarlo.'
      )
      return
    }

    // fallback
    setGeneralError('Error al intentar iniciar sesión')
  }
}


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    senData()
  }

  return (
    <>
      <BarraSuperior />

      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '83vh',
          width: '100%',
          pt: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 400,
              width: '90%',
              p: 3,
              border: '1px solid #0e0d0dff',
              borderRadius: 4,
              backgroundColor: 'rgba(243, 245, 246, 0.85)',
            }}
          >
            <Typography
              variant="h6"
              component="h4"
              sx={{ textAlign: 'center', marginBottom: 3 }}
            >
              Ingrese sus datos para iniciar sesión
            </Typography>

            <TextField
              name="user"
              label="Usuario"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(userError)}
              helperText={userError || 'Ingrese un usuario registrado'}
            />

            <TextField
              name="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={Boolean(passwordError)}
              helperText={passwordError || 'Ingrese su contraseña'}
            />

            {generalError && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {generalError}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: '16px',
                marginInline: 'auto',
                display: 'block',
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  )
}
