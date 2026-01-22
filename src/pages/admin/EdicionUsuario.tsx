import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import type { SelectChangeEvent } from '@mui/material'
import { Footer } from '../../componentes/Footer'
import { NavAdmin } from '../../componentes/admin/NavAdmin'

interface UserData {
  _id: string
  user: string
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
  phone: string
  document: string
  password?: string
}

interface RoleOption {
  _id: string
  name: string
}

interface ErrorMessages {
  [key: string]: string | undefined
}

export const EdicionUsuario = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const token = sessionStorage.getItem('authToken')

  const [userData, setUserData] = useState<UserData>({
    _id: '',
    user: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    isActive: true,
    phone: '',
    document: '',
    password: '',
  })

  const [roles, setRoles] = useState<RoleOption[]>([])
  const [errors, setErrors] = useState<ErrorMessages>({})
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const hasErrors = Object.values(errors).some(Boolean)

  /* ----------------- CARGA INICIAL ----------------- */
  useEffect(() => {
    const loadUser = async () => {
      if (!token || !id) return navigate('/manageUsers')

      try {
        // Traer usuario
        const { data } = await axios.get(`http://localhost:4000/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUserData({
          _id: data._id,
          user: data.user,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role?._id || '',
          isActive: data.isActive,
          phone: data.phone || '',
          document: data.document || '',
          password: '',
        })
      } catch (err) {
        console.error(err)
        navigate('/manageUsers')
      }

      // Traer roles
      try {
        const { data } = await axios.get('http://localhost:4000/roles', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setRoles(data)
      } catch (err) {
        console.error(err)
      }
    }

    loadUser()
  }, [id, token, navigate])

  /* ----------------- MANEJAR CAMBIOS ----------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))

    // Validaciones simples
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: 'Campo obligatorio' }))
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setUserData((prev) => ({ ...prev, role: e.target.value }))
  }

  const toggleActive = () => {
    setUserData((prev) => ({ ...prev, isActive: !prev.isActive }))
  }

  /* ----------------- SUBMIT ----------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar que el usuario no exista
    try {
      const { data: users } = await axios.get('http://localhost:4000/users', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const duplicate = users.find(
        (u: UserData) => u.user === userData.user && u._id !== userData._id
      )

      if (duplicate) {
        setErrors((prev) => ({ ...prev, user: 'El nombre de usuario ya existe' }))
        return
      }
    } catch (err) {
      console.error(err)
    }

    try {
      const payload = { ...userData }
      if (!payload.password) delete payload.password

      await axios.put(`http://localhost:4000/users/${userData._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOpenSuccessModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCloseModal = () => {
    setOpenSuccessModal(false)
    navigate('/manageUsers')
  }

  /* ----------------- UI ----------------- */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavAdmin />

      {/* Contenedor central */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 650,
            width: '100%',
            p: 3,
            border: '1px solid #ccc',
            borderRadius: 3,
            backgroundColor: '#fff',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3}>
            Editar Usuario
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Usuario"
                  name="user"
                  value={userData.user}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.user}
                  helperText={errors.user}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Contraseña nueva</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={userData.password}
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
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Apellido"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="CUIT / CUIL"
                  name="document"
                  value={userData.document}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={userData.role}
                    onChange={handleRoleChange}
                    label="Rol"
                  >
                    {roles.map((r) => (
                      <MenuItem key={r._id} value={r._id}>
                        {r.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant={userData.isActive ? 'contained' : 'outlined'}
                  color={userData.isActive ? 'error' : 'success'}
                  onClick={toggleActive}
                  fullWidth
                >
                  {userData.isActive ? 'Desactivar usuario' : 'Activar usuario'}
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={hasErrors}
                >
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Dialog open={openSuccessModal} onClose={handleCloseModal}>
            <DialogContent>
              <Typography>Usuario actualizado correctamente</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} variant="contained">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

