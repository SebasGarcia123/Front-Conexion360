import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import type { ISpace } from '../types'
import { ReservaForm } from '../componentes/ReservaForm' // <-- tu formulario exportado como componente
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, CircularProgress } from '@mui/material'
import '../styles/Amenities.css'
import { PagoTarjeta } from './PagoTarjeta'
import type { ReservationRequest } from '../types'
import axios, { AxiosError } from 'axios'

type Props = {
    space: ISpace
}

export default function CardAlternativas({ space }: Props) {
    const [open, setOpen] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [reservationData, setReservationData] =
        useState<ReservationRequest | null>(null)

    // estados para crear reserva
    const [isSubmitting, setIsSubmitting] = useState(false)

    const building = typeof space.building === 'object'
                    ? space.building
                    : null


    const handleFinishReservation = async () => {
        if (!reservationData) {
            console.error('No hay datos de reserva disponibles')
            setIsSubmitting(false)
            return
        }

        try {
            setIsSubmitting(true)
            const token = sessionStorage.getItem('authToken')
            await axios.post(
                'http://localhost:4000/reservations',
                reservationData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setIsSubmitting(false)
            setOpenPayment(false)
            setReservationData(null)
            console.log('building raw:', space.building)

        } catch (error) {
            const err = error as AxiosError
            console.error(
                'Error al enviar los datos:',
                err.response?.data || err.message
            )
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {/* card */}
            <Card
                sx={{
                    maxWidth: 300,
                    height: 480,
                    border: 1,
                    marginInline: 1,
                    transition: '0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={space.pictureUrl}
                        alt={space.spaceType}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {typeof space.building === 'object'
                                ? space.building.name
                                : 'Nombre edificio no disponible'}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {building?.address ?? '—'}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {building?.city ?? '—'}
                        </Typography>
                        

                        <Typography
                            variant="h6"
                            sx={{ color: 'text.secondary' }}
                        >
                            {space.description}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{ color: 'text.secondary' }}
                        >
                            Capacidad: {space.capacity}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{ color: 'text.secondary' }}
                        >
                            ${space.pricePerDay} / día
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => setOpen(true)}
                    >
                        Lo quiero!
                    </Button>
                </CardActions>
            </Card>

            {/* ----------------- MODAL RESERVA ----------------- */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <ReservaForm
                        space={space}
                        //onClose={() => setOpen(false)}
                        onGoToPayment={(data) => {
                            setReservationData(data) // ← guardo los datos
                            setOpen(false)
                            setOpenPayment(true)
                        }}
                    />
                </Box>
            </Modal>

            {/* MODAL PAGO */}
            <Modal open={openPayment} onClose={() => setOpenPayment(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <PagoTarjeta
                        onCancel={() => {
                            setOpenPayment(false)
                        }}
                        onFinish={() => {
                            // Pago confirmado: creamos la reserva en el backend
                            handleFinishReservation()
                        }}
                    />

                    {isSubmitting && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 2,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    )
}
