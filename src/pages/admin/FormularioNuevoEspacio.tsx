import {
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import type { IBuildingBySpace } from '../../types'
import type { spaceType } from '../../types'
import { Footer } from '../../componentes/Footer'
import { NavAdmin } from '../../componentes/admin/NavAdmin'
import fondo from '../../assets/foto-registro.jpg'
import { useNavigate } from 'react-router-dom'

export const FormularioNuevoEspacio = () => {
    const [buildings, setBuildings] = useState<IBuildingBySpace[]>([])
    const spaceTypes: spaceType[] = ['Piso', 'Oficina', 'Escritorio co-working']
    const navigate = useNavigate()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [formData, setFormData] = useState({
        pictureUrl: '',
        building: '',
        spaceType: '',
        description: '',
        capacity: '',
        pricePerDay: '',
    })

    const buildingMap: Record<string, string> = {
        'Palacio Barolo': 'Barolo',
        'Catalinas Plaza': 'Catalinas',
        'Centro Empresarial Libertador': 'Libertador',
    }

    const spaceTypeMap: Record<string, string> = {
        'Escritorio co-working': 'puesto',
        Oficina: 'oficina',
        Piso: 'piso',
    }

    const generatePictureUrl = (
        buildingName: string,
        spaceType: string
    ): string => {
        const buildingPrefix = buildingMap[buildingName] || 'Default'
        const typePrefix = spaceTypeMap[spaceType] || 'piso'

        return `http://localhost:4000/images/${typePrefix}${buildingPrefix}.png`
    }

    const handleSuccessClose = () => {
        setOpenSuccess(false)
        navigate('/admin/espacios')
    }

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                const res = await axios.get('http://localhost:4000/buildings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setBuildings(res.data)
            } catch (error) {
                console.error('Error obteniendo edificios:', error)
            }
        }

        fetchBuildings()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const updatedData = {
            ...formData,
            [name]: value,
        }

        // Si cambia building o spaceType, generamos pictureUrl
        if (name === 'building' || name === 'spaceType') {
            // buscar nombre del edificio desde la lista
            const selectedBuilding = buildings.find(
                (b) => b._id === updatedData.building
            )
            const buildingName = selectedBuilding?.name || ''

            updatedData.pictureUrl = generatePictureUrl(
                buildingName,
                updatedData.spaceType
            )
        }

        setFormData(updatedData)
    }

    const sendData = async () => {
        try {
            // obtener nombre del edificio
            const selectedBuilding = buildings.find(
                (b) => b._id === formData.building
            )
            const buildingName = selectedBuilding?.name || ''

            const finalPictureUrl = generatePictureUrl(
                buildingName,
                formData.spaceType
            )

            const finalPayload = {
                ...formData,
                pictureUrl: finalPictureUrl,
            }

            const token = sessionStorage.getItem('authToken')

            const res = await axios.post(
                'http://localhost:4000/spaces',
                finalPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.status === 201) {
                setOpenSuccess(true)
                setFormData({
                    pictureUrl: '',
                    building: '',
                    spaceType: '',
                    description: '',
                    capacity: '',
                    pricePerDay: '',
                })
            }
        } catch (error) {
            console.error(error)

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        'Error al crear el espacio ❌'
                )
            } else {
                alert('Error desconocido ❌')
            }
        }
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <NavAdmin />

            <Box
                sx={{
                    flexGrow: 1,
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        maxWidth: 500,
                        width: '100%',
                        border: '1px solid rgb(10, 10, 10)',
                    }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        mb={3}
                        fontWeight="bold"
                    >
                        Nuevo Espacio
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            select
                            label="Edificio"
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                            fullWidth
                        >
                            {buildings.map((b) => (
                                <MenuItem key={b._id} value={b._id}>
                                    {b.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Tipo de Espacio"
                            name="spaceType"
                            value={formData.spaceType}
                            onChange={handleChange}
                            fullWidth
                        >
                            {spaceTypes.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>
                                    {tipo}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Descripción"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <TextField
                            label="Capacidad"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Precio por Día"
                            name="pricePerDay"
                            value={formData.pricePerDay}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                mt: 2,
                                px: 5,
                                alignSelf: 'center',
                            }}
                            onClick={sendData}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Paper>
            </Box>

            <Footer />
            <Dialog open={openSuccess} onClose={handleSuccessClose}>
  <DialogTitle>Espacio creado </DialogTitle>

  <DialogContent>
    <Typography>
      El espacio fue creado con éxito.
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleSuccessClose} variant="contained">
      Aceptar
    </Button>
  </DialogActions>
</Dialog>

        </Box>
    )
}
