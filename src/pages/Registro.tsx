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
import fondo from '../assets/foto-registro.jpg'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../componentes/Footer'
import { BarraSuperior } from '../componentes/BarraSuperior'
import type { ValidationError } from '../types'
import type { ErrorMessages } from '../types'

export const Registro = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const [objData, setObjData] = useState({
        user: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        document: '',
        role: 'cliente',
    })
    const [errors, setErrors] = useState<ErrorMessages>({})

    const validations = (name: string, value: string) => {
        const errorMessages = {
            user: 'Complete el campo de usuario',
            password:
                'La contraseña debe tener al menos 8 caracteres y una mayúscula',
            email: 'Ingrese un email válido',
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const errorMessage = !value.trim()
            ? `El campo ${name} es obligatorio`
            : name === 'password' && (value.length < 8 || !/[A-Z]/.test(value))
              ? errorMessages[name]
              : name === 'email' && !emailRegex.test(value)
                ? errorMessages[name]
                : null

        return { [name]: errorMessage }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setObjData((prev) => ({ ...prev, [name]: value }))

        const validationResult = validations(name, value)
        setErrors((prev) => ({ ...prev, ...validationResult }))
    }

    const navigate = useNavigate()

    const senData = async () => {
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objData),
            })
            if (response.status === 400) {
                const responseData = await response.json()
                console.log(responseData.errors)
                const errorMessages = (responseData.errors as ValidationError[])
                    .map((error) => [error.path, error.msg])
                    .reduce(
                        (acc, [path, msg]) => ({ ...acc, [path]: msg }),
                        {} as Record<string, string>
                    )
                setErrors(errorMessages)
                throw new Error('Error al enviar los datos de registro')
            }

            navigate('/login')
        } catch (error) {
            console.error('Error al enviar los datos:', error)
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
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '83vh',
                    width: '100%',
                    alignItems: 'center',
                    pt: 4,
                    flexGrow: 1,
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
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 3,
                        marginBottom: 6,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h4"
                        sx={{ textAlign: 'center', marginBottom: 5 }}
                    >
                        Complete los campos para registrarse
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            {/* Usuario */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    name="user"
                                    label="Usuario"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    value={objData.user}
                                />
                                {errors.user && (
                                    <span style={{ color: 'red' }}>
                                        {errors.user}
                                    </span>
                                )}
                            </Grid>

                            {/* Contraseña */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="password">
                                        Contraseña
                                    </InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        onChange={handleChange}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword
                                                            ? 'hide the password'
                                                            : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Contraseña"
                                        value={objData.password}
                                    />
                                </FormControl>
                                {errors.password && (
                                    <span style={{ color: 'red' }}>
                                        {errors.password}
                                    </span>
                                )}
                            </Grid>

                            {/* Nombre */}
                            <Grid
                                size={{ xs: 12, sm: 6 }}
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <TextField
                                    required
                                    name="firstName"
                                    label="Nombre"
                                    type="text"
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{ width: 239, marginRight: 3 }}
                                />
                            </Grid>

                            {/* Apellido */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    name="lastName"
                                    label="Apellido"
                                    type="text"
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{ width: 239 }}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid size={{ xs: 12, xl: 12 }}>
                                <TextField
                                    required
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    value={objData.email}
                                />
                                {errors.email && (
                                    <span style={{ color: 'red' }}>
                                        {errors.email}
                                    </span>
                                )}
                            </Grid>

                            {/* Teléfono */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    name="phone"
                                    label="Teléfono"
                                    type="text"
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{ width: 239, marginRight: 3 }}
                                    helperText="Sin O ni prefijo 15"
                                />
                            </Grid>

                            {/* CUIL */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    name="document"
                                    label="CUIT / CUIL"
                                    type="text"
                                    variant="outlined"
                                    onChange={handleChange}
                                    sx={{ width: 239 }}
                                    helperText="Ingrese el número sin guiones ni espacios"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                marginTop: '40px',
                                marginInline: 'auto',
                                display: 'block',
                                px: 4,
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
