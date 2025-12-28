import { Box, Button, TextField, Typography } from '@mui/material'
import fondo from '../assets/fondo-login.jpg'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarraSuperior } from '../componentes/BarraSuperior'
import { Footer } from '../componentes/Footer'

export const Login = () => {
    const [objData, setObjData] = useState({ user: '', password: '' })

    const handleChange = ({
        target: { value, name },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setObjData({ ...objData, [name]: value })
    }

    const navigate = useNavigate()

    const senData = async () => {
        try {
            const { data } = await axios.post(
                'http://localhost:4000/login',
                objData
            )

            console.log('Respuesta del servidor:', data)
            sessionStorage.setItem('authToken', data.token)

            if (data.user.role === 'cliente') {
                navigate('/cliente', { replace: true })
            }
            if (data.user.role === 'admin') {
                navigate('/admin', { replace: true })
            }
        } catch (error) {
            const err = error as AxiosError
            console.error(
                'Error al enviar los datos:',
                err.response?.data || err.message
            )
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Datos del formulario:', objData)
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
                            helperText="Ingrese un usuario registrado"
                            onChange={handleChange}
                        />
                        <TextField
                            name="password"
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            helperText="Ingrese su contraseña"
                            onChange={handleChange}
                        />
                        {/* {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )} */}
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
