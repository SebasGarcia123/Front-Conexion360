import { Button, MenuItem, Paper, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import type { IBuildingBySpace } from '../../types'
import type { spaceType } from '../../types'

export const FormularioNuevoEspacio = () => {
    const [buildings, setBuildings] = useState<IBuildingBySpace[]>([])
    const spaceTypes: spaceType[] = ['Piso', 'Oficina', 'Escritorio co-working']
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
                pictureUrl: finalPictureUrl, // garantizamos que NO esté vacío
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
                alert('Espacio creado con éxito ✔')
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
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
            <h2 style={{ marginBottom: 20 }}>Nuevo Espacio</h2>

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
                    size="large"
                    sx={{ mt: 2, borderRadius: 2 }}
                    onClick={sendData}
                >
                    Guardar
                </Button>
            </Stack>
        </Paper>
    )
}
