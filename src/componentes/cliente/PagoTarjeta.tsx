import React, { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    Divider,
    CircularProgress,
} from '@mui/material'

interface PagoTarjetaProps {
    onCancel: () => void
    onFinish: () => void
}

type PaymentErrors = {
    cardHolder?: string
    cardNumber?: string
    month?: string
    year?: string
    expiry?: string
    cvv?: string
}

export const PagoTarjeta: React.FC<PagoTarjetaProps> = ({
    onCancel,
    onFinish,
}) => {
    const [cardHolder, setCardHolder] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [cvv, setCvv] = useState('')
    const [completed, setCompleted] = useState(false)
    const [errors, setErrors] = useState<PaymentErrors>({})
    const [loading, setLoading] = useState(false)

    //Validacion de datos cargados
    const validate = () => {
        const newErrors: PaymentErrors = {}

        // Nombre del titular: 3-26 letras/espacios en mayúsculas
        if (!/^[A-Z\s]{3,26}$/.test(cardHolder)) {
            newErrors.cardHolder = 'Solo letras y espacios (3–26 caracteres).'
        }

        // Número de tarjeta: exactamente 16 dígitos
        if (!/^\d{16}$/.test(cardNumber)) {
            newErrors.cardNumber = 'Debe contener 16 números.'
        }

        // MES
        if (!/^\d{1,2}$/.test(month)) {
            newErrors.month = 'Mes inválido.'
        } else {
            const mm = Number(month)
            if (mm < 1 || mm > 12) {
                newErrors.month = 'Debe ser 01 a 12.'
            }
        }

        // AÑO (2 dígitos)
        if (!/^\d{2}$/.test(year)) {
            newErrors.year = 'Año inválido.'
        }

        // Validación de vencimiento (solo si month y year no tienen error sintáctico)
        if (!newErrors.month && !newErrors.year) {
            const mm = Number(month)
            const yy = Number(year)

            const expiryDate = new Date(2000 + yy, mm - 1, 1)
            const now = new Date()
            now.setDate(1)

            if (expiryDate < now) {
                newErrors.expiry = 'La tarjeta está vencida.'
            }
        }

        // CVV: 3 o 4 dígitos
        if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'CVV inválido.'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    // --------------------------
    // Confirmar pago
    // --------------------------
    const handleSubmit = () => {
        if (!validate()) return

        setLoading(true) // 🔄 Mostrar spinner

        // Simular transacción de 2 segundos
        setTimeout(() => {
            setLoading(false)
            setCompleted(true)
        }, 2000)
    }

    // --------------------------
    // Reset cuando se cierra
    // --------------------------
    const resetForm = () => {
        setCardHolder('')
        setCardNumber('')
        setMonth('')
        setYear('')
        setCvv('')
        setCompleted(false)
        setErrors({})
    }

    const formatCardNumber = (num: string) => {
        return num
            .replace(/\D/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim()
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
            {/* BOTÓN CERRAR */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => {
                        resetForm()
                        onCancel()
                    }}
                    sx={{
                        bgcolor: 'red',
                        color: 'white',
                        px: 0.5,
                        py: 0.5,
                        borderRadius: 2,
                        marginBottom: 2,
                        '&:hover': { bgcolor: '#b30000' },
                    }}
                >
                    X
                </Button>
            </Box>

            {/* 💳 Vista previa */}
            <Card
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #004aad, #5de0e6)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography sx={{ letterSpacing: 2, fontSize: '1.3rem' }}>
                        {formatCardNumber(cardNumber.padEnd(16, '0'))}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Typography sx={{ textTransform: 'uppercase' }}>
                            {cardHolder || 'NOMBRE COMPLETO'}
                        </Typography>
                        <Typography>
                            {(month || '00') + '/' + (year || '00')}
                        </Typography>
                    </Box>

                    <Typography sx={{ mt: 2 }}>CVC: {cvv || '000'}</Typography>
                </CardContent>
            </Card>

            <Divider sx={{ mb: 3 }} />

            {/* FORMULARIO */}
            {!completed ? (
                <Grid container spacing={2}>
                    {/* NOMBRE */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Nombre del titular"
                            value={cardHolder}
                            onChange={(e) => {
                                const val = e.target.value.toUpperCase()
                                if (
                                    /^[A-Z\s]*$/.test(val) &&
                                    val.length <= 26
                                ) {
                                    setCardHolder(val)
                                }
                            }}
                            error={!!errors.cardHolder}
                            helperText={errors.cardHolder ?? ''}
                            fullWidth
                        />
                    </Grid>

                    {/* NÚMERO */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Número de tarjeta"
                            value={formatCardNumber(cardNumber)}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '') // solo números
                                if (val.length <= 16) setCardNumber(val)
                            }}
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber ?? ''}
                            fullWidth
                        />
                    </Grid>

                    {/* MES */}
                    <Grid size={{ xs: 4 }}>
                        <TextField
                            fullWidth
                            label="Mes"
                            value={month}
                            error={!!errors.month}
                            helperText={errors.month ?? ''}
                            onChange={(e) =>
                                setMonth(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 2)
                                )
                            }
                        />
                    </Grid>

                    {/* AÑO */}
                    <Grid size={{ xs: 4 }}>
                        <TextField
                            fullWidth
                            label="Año"
                            value={year}
                            error={!!errors.year}
                            helperText={errors.year ?? ''}
                            onChange={(e) =>
                                setYear(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 2)
                                )
                            }
                        />
                    </Grid>

                    {/* CVV */}
                    <Grid size={{ xs: 4 }}>
                        <TextField
                            label="CVV"
                            value={cvv}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '')
                                if (val.length <= 4) setCvv(val)
                            }}
                            error={!!errors.cvv}
                            helperText={errors.cvv ?? ''}
                            fullWidth
                        />
                    </Grid>

                    {/* ERROR DE VENCIMIENTO */}
                    {errors.expiry && (
                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ color: 'red' }}>
                                {errors.expiry}
                            </Typography>
                        </Grid>
                    )}

                    {/* BOTÓN */}
                    <Grid size={{ xs: 12 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ py: 1.2 }}
                            onClick={handleSubmit}
                            disabled={loading} // deshabilitar mientras carga
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{ color: 'white' }}
                                />
                            ) : (
                                'Confirmar pago'
                            )}
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        ¡Gracias!
                    </Typography>
                    <Typography sx={{ mb: 4 }}>
                        Tu pago fue procesado correctamente.
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            onFinish()
                        }}
                    >
                        Finalizar
                    </Button>
                </Box>
            )}
        </Box>
    )
}
