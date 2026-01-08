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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { NavCliente } from '../../componentes/cliente/NavCliente'
import { Footer } from '../../componentes/Footer'
import fondo from '../../assets/foto-registro.jpg'
import axios, { AxiosError } from 'axios'
import type { ErrorMessages, ValidationError } from '../../types'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '../../types'


interface EditUserData {
  user: string
  email: string
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
  const [userId, setUserId] = useState<string | null>(null)
  const [openSuccess, setOpenSuccess] = useState(false)

  const token = sessionStorage.getItem('authToken')

  const [objData, setObjData] = useState<EditUserData>({
    user: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    document: '',
  })

  


  /* ----------------- CARGA INICIAL ----------------- */

useEffect(() => {
  const loadProfile = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    const decoded = jwtDecode<JWTPayload>(token)
    setUserId(decoded._id)

    const res = await axios.get(
      `http://localhost:4000/users/${decoded._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    setObjData({
      user: res.data.user,
      email: res.data.email,
      password: '',
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      phone: res.data.phone ?? '',
      document: res.data.document ?? '',
    })
  }

  loadProfile()
}, [])



  /* ----------------- VALIDACIONES ----------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setObjData((prev) => ({ ...prev, [name]: value }))

    // Limpia error solo del campo editado
    if (errors[name as keyof EditUserData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }
   
  //valida que los campos esten todos con algo que no sea vacio, si hay alguno vacio lo pone en modo error
  const validateRequiredFields = (): boolean => {
    const newErrors: ErrorMessages = {}

    const requiredFields: (keyof EditUserData)[] = [
      'user',
      'email',
      'firstName',
      'lastName',
      'document',
    ]

    requiredFields.forEach((field) => {
      const value = objData[field]

      if (!value || value.trim() === '') {
        newErrors[field] = 'Este campo es obligatorio'
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  /* ----------------- SUBMIT ----------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // ⛔ PRIMERO validar
  if (!validateRequiredFields()) {
    return
  }

  try {
    const payload = { ...objData }

    if (!payload.password) {
      delete payload.password
    }

    if (!userId) return

    await axios.put(
      `http://localhost:4000/users/${userId}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    setOpenSuccess(true)
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
                  error={!!errors.document}
                  helperText={errors.document}
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
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={objData.email}
                  onChange={handleChange}
                  error={!!errors.document}
                  helperText={errors.document}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  fullWidth
                  value={objData.firstName}
                  onChange={handleChange}
                  error={!!errors.document}
                  helperText={errors.document}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Apellido"
                  name="lastName"
                  fullWidth
                  value={objData.lastName}
                  onChange={handleChange}
                  error={!!errors.document}
                  helperText={errors.document}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  fullWidth
                  value={objData.phone}
                  onChange={handleChange}
                  error={!!errors.document}
                  helperText={errors.document}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="CUIT / CUIL"
                  name="document"
                  fullWidth
                  value={objData.document}
                  onChange={handleChange}
                  error={!!errors.document}
                  helperText={errors.document}
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

      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
          ✅ Perfil actualizado
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', mt: 1 }}>
          <Typography>
            Tus datos fueron guardados correctamente.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenSuccess(false)
              navigate(-1)
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
