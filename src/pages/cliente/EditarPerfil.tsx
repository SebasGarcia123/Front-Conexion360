import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { NavCliente } from '../../componentes/cliente/NavCliente'
import { Footer } from '../../componentes/Footer'
import fondo from '../../assets/foto-registro.jpg'
import axios, { AxiosError } from 'axios'
import type { ErrorMessages, ValidationError } from '../../types'
import { useNavigate } from 'react-router-dom'

interface EditUserData {
  user: string
  password?: string
  firstName: string
  lastName: string
  phone: string
  document: string
}

export const EditarPerfil = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ErrorMessages>({})

  const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null')
  const token = sessionStorage.getItem('authToken')

  const [objData, setObjData] = useState<EditUserData>({
    user: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    document: '',
  })

  /* ----------------- CARGA INICIAL ----------------- */
  useEffect(() => {
    if (!storedUser || !token) {
      navigate('/login')
      return
    }

    setObjData((prev) => ({
      ...prev,
      user: storedUser.user ?? '',
      firstName: storedUser.firstName ?? '',
      lastName: storedUser.lastName ?? '',
    }))
  }, [])

  /* ----------------- VALIDACIONES ----------------- */
  const validations = (name: string, value: string) => {
    const errorMessages = {
      user: 'Complete el campo de usuario',
      password:
        'La contraseña debe tener al menos 8 caracteres y una mayúscula',
    }

    const errorMessage =
      !value.trim() && name !== 'password'
        ? `El campo ${name} es obligatorio`
        : name === 'password' && value.length > 0 &&
          (value.length < 8 || !/[A-Z]/.test(value))
        ? errorMessages.password
        : null

    return { [name]: errorMessage }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setObjData((prev) => ({ ...prev, [name]: value }))

    const validationResult = validations(name, value)
    setErrors((prev) => ({ ...prev, ...validationResult }))
  }

  /* ----------------- SUBMIT ----------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload = { ...objData }

      // Si password está vacío, no se envía
      if (!payload.password) {
        delete payload.password
      }

      await axios.put(
        `http://localhost:4000/users/${storedUser._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert('Perfil actualizado correctamente')
      navigate(-1)
    } catch (error) {
      const err = error as AxiosError<{ errors: ValidationError[] }>
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => [e.path, e.msg])
          .reduce(
            (acc, [path, msg]) => ({ ...acc, [path]: msg }),
            {} as Record<string, string>
          )
        setErrors(errorMessages)
      }
    }
  }

  /* ----------------- UI ----------------- */
  return (
    <>
      <NavCliente />

      <Box
        sx={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          minHeight: '83vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          pt: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 650,
            width: '100%',
            p: 4,
            border: '1px solid #0e0d0dff',
            borderRadius: 4,
            backgroundColor: 'rgba(243, 245, 246, 0.85)',
          }}
        >
          <Typography variant="h6" textAlign="center" mb={4}>
            Editar perfil
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Usuario"
                  name="user"
                  fullWidth
                  value={objData.user}
                  onChange={handleChange}
                />
                {errors.user && <span style={{ color: 'red' }}>{errors.user}</span>}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Contraseña nueva</InputLabel>
                  <OutlinedInput
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={objData.password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña nueva"
                  />
                </FormControl>
                {errors.password && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  fullWidth
                  value={objData.firstName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Apellido"
                  name="lastName"
                  fullWidth
                  value={objData.lastName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  fullWidth
                  value={objData.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="CUIT / CUIL"
                  name="document"
                  fullWidth
                  value={objData.document}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 4, mx: 'auto', display: 'block', px: 4 }}
            >
              Guardar cambios
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  )
}
