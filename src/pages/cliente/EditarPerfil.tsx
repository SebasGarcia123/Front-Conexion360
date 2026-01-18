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

interface UpdateMeRequest {
  user?: string
  password?: string
    firstName?: string
  lastName?: string
  phone?: string
  document?: string
  }

export const EditarPerfil = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ErrorMessages>({})
  const hasErrors = Object.values(errors).some(Boolean)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const token = sessionStorage.getItem('authToken')
    const [objData, setObjData] = useState<UpdateMeRequest>({
    user: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    document: '',
  })

  /* ----------------- CARGA INICIAL ----------------- */
  useEffect(() => {
    const loadUser = async () => {
    try {
      if (!token) {
        navigate('/login')
        return
      }

      const { data } = await axios.get(
        'http://localhost:4000/users/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setObjData({
        user: data.user ?? '',
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        phone: data.phone ?? '',
        document: data.document ?? '',
      })

    } catch {
    navigate('/login')
    }
  }

  loadUser()
}, [token, navigate])


  /* ----------------- VALIDACIONES ----------------- */
  const validations = (name: string, value: string) => {
  if (name === 'password') {
    if (
      value &&
      value.length > 0 &&
      (value.length < 8 || !/[A-Z]/.test(value))
    ) {
      return {
        [name]:
          'La contraseña debe tener al menos 8 caracteres y una mayúscula',
      }
    }
    return { [name]: undefined }
  }

  if (!value || !value.trim()) {
    return {
      [name]: 'Complete el campo para poder enviar los cambios',
    }
  }

  return { [name]: undefined }
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
    const payload: UpdateMeRequest = { ...objData }
        Object.keys(payload).forEach((key) => {
          if (!payload[key as keyof UpdateMeRequest]) {
            delete payload[key as keyof UpdateMeRequest]
          }
        })
        await axios.put(`http://localhost:4000/users/me`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setOpenSuccessModal(true)
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

  const handleCloseModal = () => {
  setOpenSuccessModal(false)
  navigate('/cliente')
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
                {errors.firstName && (
                  <span style={{ color: 'red' }}>{errors.firstName}</span>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Apellido"
                  name="lastName"
                  fullWidth
                  value={objData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span style={{ color: 'red' }}>{errors.lastName}</span>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  fullWidth
                  value={objData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span style={{ color: 'red' }}>{errors.phone}</span>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="CUIT / CUIL"
                  name="document"
                  fullWidth
                  value={objData.document}
                  onChange={handleChange}
                />
                {errors.document && (
                  <span style={{ color: 'red' }}>{errors.document}</span>
                )}
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              disabled={hasErrors}
              sx={{ mt: 4, mx: 'auto', display: 'block', px: 4 }}
            >
              Guardar cambios
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openSuccessModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography>
            El perfil se modificó correctamente.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  )
}