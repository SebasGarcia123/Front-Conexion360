import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Footer } from '../../componentes/Footer'
import fondo from '../../assets/foto-registro.jpg'
import { NavAdmin } from '../../componentes/admin/NavAdmin'

export const FormularioNuevoEdificio = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        latitude: '',
        longitude: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const sendData = async () => {
        try {
            const token = sessionStorage.getItem('authToken')
            await axios.post('http://localhost:4000/buildings', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            alert('Edificio creado con éxito ✔')
            setFormData({
                name: '',
                address: '',
                city: '',
                country: '',
                postalCode: '',
                latitude: '',
                longitude: '',
            })
        } catch (error: unknown) {
            console.log(error)
            if(axios.isAxiosError(error)){
            alert(error.response?.data?.message || 'Error al crear el edificio ❌')
            } else{
                alert('Error desconocido')
            }
        }
    }

    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
        >

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
                    sx={{ p: 4, borderRadius: 3, maxWidth: 500, width: '100%',border: '1px solid rgb(10, 10, 10)' }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        mb={3}
                        fontWeight="bold"
                    >
                        Nuevo Edificio
                    </Typography>


                    <Stack spacing={2}>
                        <TextField label="Nombre" name="name" value={formData.name} onChange={handleChange} />
                        <TextField label="Dirección" name="address" value={formData.address} onChange={handleChange} />
                        <TextField label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
                        <TextField label="País" name="country" value={formData.country} onChange={handleChange} />
                        <TextField label="Latitud" name="latitude" value={formData.latitude} onChange={handleChange} />
                        <TextField label="Longitud" name="longitude" value={formData.longitude} onChange={handleChange} />
                        <TextField label="Código Postal" name="postalCode" value={formData.postalCode} onChange={handleChange} />

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
        </Box>
    )
}
