import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { NavAdmin } from '../../componentes/admin/NavAdmin'
import { Footer } from '../../componentes/Footer'
import fondo from '../../assets/foto-registro.jpg'

type SpaceForm = {
  spaceType: string
  description: string
  capacity: number
  pricePerDay: number
  isActive: boolean
  buildingName: string
}

export const EditarEspacio = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('authToken')

  const [loading, setLoading] = useState(true)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)

  const [formData, setFormData] = useState<SpaceForm>({
    spaceType: '',
    description: '',
    capacity: 0,
    pricePerDay: 0,
    isActive: true,
    buildingName: '',
  })

  /* ----------------- CARGA INICIAL ----------------- */
  useEffect(() => {
    const loadSpace = async () => {
      try {
        if (!token) {
          navigate('/login')
          return
        }

        const { data } = await axios.get(
          `http://localhost:4000/spaces/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        setFormData({
          spaceType: data.spaceType,
          description: data.description ?? '',
          capacity: data.capacity,
          pricePerDay: data.pricePerDay,
          isActive: data.isActive,
          buildingName: data.building?.name ?? 'Edificio no asignado',
        })
      } catch {
        navigate('/admin/espacios')
      } finally {
        setLoading(false)
      }
    }

    loadSpace()
  }, [id, token, navigate])

  /* ----------------- HANDLERS ----------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'capacity' || name === 'pricePerDay'
          ? Number(value)
          : value,
    }))
  }

  /* ----------------- SUBMIT ----------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await axios.put(
      `http://localhost:4000/spaces/${id}`,
      {
        spaceType: formData.spaceType,
        description: formData.description,
        capacity: formData.capacity,
        pricePerDay: formData.pricePerDay,
        isActive: formData.isActive,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    setOpenSuccessModal(true)
  }

  /* ----------------- UI ----------------- */
  return (
    <>
      <NavAdmin />

      <Box
        sx={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            minHeight: '83vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
        <Box
            sx={{
                maxWidth: 480,
                width: '100%',
                p: 3,
                borderRadius: 3,
                backgroundColor: 'rgba(243,245,246,0.9)',
            }}
            >
          <Typography variant="h6" textAlign="center" mb={4}>
            Editar espacio
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size ={{ xs:6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        label="Estado"
                        value={formData.isActive ? 'activo' : 'inactivo'}
                        onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.value === 'activo',
                        }))
                        }
                    >
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                    <Typography variant="caption" color="text.secondary">
                    Los espacios inactivos no estarán visibles para los clientes
                    </Typography>

                    </FormControl>

                </Grid>

                <Grid size ={{ xs:6 }}>
                  <TextField
                    label="Edificio"
                    value={formData.buildingName}
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid size ={{ xs:6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de espacio</InputLabel>
                    <Select
                        label="Tipo de espacio"
                        value={formData.spaceType}
                        onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            spaceType: e.target.value,
                        }))
                        }
                    >
                        <MenuItem value="Oficina">Oficina</MenuItem>
                        <MenuItem value="Piso">Piso</MenuItem>
                        <MenuItem value="Escritorio co-working">
                        Escritorio co-working
                        </MenuItem>
                    </Select>
                    </FormControl>

                </Grid>

                <Grid size ={{ xs:6 }}>
                  <TextField
                    label="Capacidad"
                    name="capacity"
                    type="number"
                    fullWidth
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size ={{ xs:6 }}>
                  <TextField
                    label="Precio por día"
                    name="pricePerDay"
                    type="number"
                    fullWidth
                    value={formData.pricePerDay}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size ={{ xs:12 }}>
                  <TextField
                    label="Descripción"
                    name="description"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 4, mx: 'auto', display: 'block' }}
              >
                Guardar cambios
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
        open={openSuccessModal}
        onClose={() => navigate('/admin/espacios')}
      >
        <DialogContent>
          <Typography>El espacio se actualizó correctamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate('/admin/espacios')}
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  )
}
