import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Alert,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import fondo from '../../assets/foto-registro.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { Footer } from '../../componentes/Footer'
import { BarraSuperior } from '../../componentes/BarraSuperior'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { ISpace, RentType } from '../../types'

dayjs.extend(isBetween)

export const NuevaReserva = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const space: ISpace | undefined = location.state?.space
    const [reservasExistentes, setReservasExistentes] = useState<
        { dateFrom: string; dateTo: string }[]
    >([])

    useEffect(() => {
        const getData = async () => {
            if (!space?._id) return
            const token = sessionStorage.getItem('authToken')
            const r = await axios.get(
                `http://localhost:4000/reservations/space/${space._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            setReservasExistentes(r.data)
        }

        getData()
    }, [space])

    const isDateReserved = (date: Dayjs) => {
        if (date.isBefore(dayjs(), 'day')) return true
        return reservasExistentes.some((r) => {
            const start = dayjs(r.dateFrom)
            const end = dayjs(r.dateTo)
            return date.isBetween(start, end, 'day', '[]')
        })
    }

    const [objData, setObjData] = useState({
        userId: '',
        spaceId: space?._id || '',
        buildingId:
            typeof space?.building === 'string'
                ? space.building
                : (space?.building?._id ?? ''),
        dateFrom: '',
        dateTo: '',
        totalPrice: space?.pricePerDay || 0,
        rentType: '',
    })

    // 🔹 Manejo de cambios de RentType
    const handleRentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rentType = e.target.value as RentType

        setObjData((prev) => {
            const newState = { ...prev, rentType }

            if (prev.dateFrom) {
                handleDateOrRentChange(dayjs(prev.dateFrom), rentType)
            }

            return newState
        })
    }

    // 🔹 Calcular automáticamente dateTo y totalPrice
    const handleDateOrRentChange = async (
        date: Dayjs | null,
        rentType?: RentType
    ) => {
        if (!date || !space) return

        const type = rentType || objData.rentType

        if (!type) {
            return
        }
        let endDate = date

        switch (type) {
            case 'Dia':
                endDate = date.add(1, 'day')
                break
            case 'Semana':
                endDate = date.add(1, 'week')
                break
            case 'Mes':
                endDate = date.add(1, 'month')
                break
            case 'Año':
                endDate = date.add(1, 'year')
                break
        }

        //Validacion de disponibilidad
        const token = sessionStorage.getItem('authToken')
        const r = await axios.get(
            `http://localhost:4000/spaces/${space._id}/availability`,
            {
                params: {
                    dateFrom: date.toISOString(),
                    dateTo: endDate.toISOString(),
                },
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        if (!r.data.available) {
            alert('Este espacio ya está reservado en esas fechas')
            return
        }

        // Calcular totalPrice
        const multiplier =
            type === 'Dia'
                ? 1
                : type === 'Semana'
                  ? 7
                  : type === 'Mes'
                    ? 30
                    : 365

        const totalPrice = space.pricePerDay * multiplier

        setObjData((prev) => ({
            ...prev,
            dateFrom: date.toISOString(),
            dateTo: endDate.toISOString(),
            totalPrice,
        }))
    }

    // 🔹 Enviar datos al backend
    const sendData = async () => {
        try {
            const token = sessionStorage.getItem('authToken')

            const response = await axios.post(
                'http://localhost:4000/reservations',
                objData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log('Reserva creada:', response.data)
            navigate('/cliente')
        } catch (error) {
            console.error('Error al crear la reserva:', error)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        sendData()
        ;<Alert variant="filled" severity="success">
            La reserva se generó con éxito
        </Alert>
    }

    return (
        <>
            <BarraSuperior />
            <Box
                sx={{
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '83vh',
                    width: '100%',
                    alignItems: 'center',
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
                        display: 'flex',
                        flexDirection: 'column',
                        mt: 3,
                        mb: 6,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'center', mb: 5 }}
                    >
                        Complete los campos para generar una reserva
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            {/* 🔹 Building */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Edificio"
                                    variant="outlined"
                                    fullWidth
                                    value={
                                        typeof space?.building === 'string'
                                            ? 'Nombre edificio no disponible'
                                            : space?.building?.name ||
                                              'Nombre edificio no disponible'
                                    }
                                />
                            </Grid>

                            {/* 🔹 Space */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Espacio"
                                    variant="outlined"
                                    fullWidth
                                    value={
                                        space?.spaceType ||
                                        'Nombre de espacio no disponible'
                                    }
                                />
                            </Grid>

                            {/* 🔹 RentType */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    label="Tipo de renta"
                                    variant="outlined"
                                    fullWidth
                                    value={objData.rentType}
                                    onChange={handleRentTypeChange}
                                >
                                    {['Dia', 'Semana', 'Mes', 'Año'].map(
                                        (type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Grid>

                            {/* 🔹 Fechas */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DatePicker
                                        disabled={!objData.rentType}
                                        label="Fecha de inicio"
                                        value={
                                            objData.dateFrom
                                                ? dayjs(objData.dateFrom)
                                                : null
                                        }
                                        onChange={(date) => {
                                            if (!date) return
                                            setObjData((prev) => ({
                                                ...prev,
                                                dateFrom:
                                                    date?.toISOString() || '',
                                            }))
                                            handleDateOrRentChange(date)
                                        }}
                                        shouldDisableDate={(date) =>
                                            isDateReserved(date)
                                        }
                                        slots={{
                                            day: (dayProps) => {
                                                const isReserved =
                                                    isDateReserved(dayProps.day)
                                                if (isReserved) {
                                                    return (
                                                        <Tooltip title="Reservado">
                                                            <span>
                                                                <PickersDay
                                                                    {...dayProps}
                                                                    disabled
                                                                    sx={{
                                                                        pointerEvents:
                                                                            'none',
                                                                        backgroundColor:
                                                                            '#d89292ff',
                                                                        color: '#ffffff',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                />
                                                            </span>
                                                        </Tooltip>
                                                    )
                                                }

                                                return (
                                                    <PickersDay {...dayProps} />
                                                )
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DatePicker
                                        label="Fecha de finalización"
                                        value={
                                            objData.dateTo
                                                ? dayjs(objData.dateTo)
                                                : null
                                        }
                                        readOnly
                                    />
                                </Grid>
                            </LocalizationProvider>

                            {/* 🔹 TotalPrice */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Precio total"
                                    variant="outlined"
                                    fullWidth
                                    value={objData.totalPrice}
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 4, display: 'block', mx: 'auto', px: 4 }}
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
