import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Chip,
    Grid,
} from '@mui/material'
import dayjs from 'dayjs'
import type { Reservation } from '../../types'

interface Props {
    reservation: Reservation
    onCancel: (id: string) => void
    onRate: (r: Reservation) => void
}

export const CardMiReserva = ({ reservation, onCancel, onRate }: Props) => {
    const space =
        typeof reservation.spaceId === 'object' ? reservation.spaceId : null

    const building = typeof space?.building === 'object' ? space.building : null

    const chipStyles = {
        Cumplida: { bgcolor: 'success.main' },
        Pendiente: { bgcolor: 'warning.main' },
        'Por Valorar': { bgcolor: '#f9e74a', color: '#000' },
        Cancelada: { bgcolor: 'grey.400' },
    }
    return (
        <Card
            sx={{
                display: 'flex',
                mb: 3,
                borderRadius: 3,
                boxShadow: 6,
            }}
        >
            {/* Imagen */}
            <CardMedia
                component="img"
                sx={{ width: 260 }}
                image={space?.pictureUrl || '/placeholder.jpg'}
                alt="Espacio"
            />

            <CardContent sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    {/* Info principal */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {building?.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {building
                                ? `${building.address} · ${building.city}`
                                : 'Dirección no disponible'}
                        </Typography>

                        <Box mt={2}>
                            <Typography variant="body2">
                                📅 Desde:{' '}
                                <strong>
                                    {dayjs(reservation.dateFrom).format(
                                        'DD/MM/YYYY'
                                    )}
                                </strong>
                            </Typography>

                            <Typography variant="body2">
                                📅 Hasta:{' '}
                                <strong>
                                    {dayjs(reservation.dateTo).format(
                                        'DD/MM/YYYY'
                                    )}
                                </strong>
                            </Typography>

                            <Typography variant="body2" mt={1}>
                                👥 Capacidad: <strong>{space?.capacity}</strong>
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Estado + acciones */}
                    <Grid
                        size={{ xs: 12, md: 4 }}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="flex-end"
                    >
                        <Chip
                            label={reservation.status.toUpperCase()}
                            sx={{
                                mb: 2,
                                ...chipStyles[
                                    reservation.status as keyof typeof chipStyles
                                ],
                            }}
                        />

                        {reservation.status === 'Pendiente' && (
                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => onCancel(reservation._id)}
                            >
                                Cancelar
                            </Button>
                        )}

                        {reservation.status === 'Por Valorar' && (
                            <Button
                                color="info"
                                variant="contained"
                                onClick={() => onRate(reservation)}
                            >
                                Valorar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
