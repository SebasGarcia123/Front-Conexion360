import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import type { Reservation } from '../../types'
import { NavCliente } from '../../componentes/NavCliente'
import { Footer } from '../../componentes/Footer'

export const MisReservas = () => {
    const [reservas, setReservas] = useState<Reservation[]>([])

    const getData = async () => {
        const token = sessionStorage.getItem('authToken')
        const r = await axios.get('http://localhost:4000/reservations/my', {
            headers: { Authorization: `Bearer ${token}` },
        })
        setReservas(r.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const cancelar = async (id: string) => {
        const token = sessionStorage.getItem('authToken')
        await axios.delete(`http://localhost:4000/reservations/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        getData()
    }

    return (
        <>
            <NavCliente />

            <Box sx={{ minHeight: '100vh', px: 2 }}>
                {reservas.length === 0 ? (
                    <Typography textAlign="center" mt={5}>
                        No tenés reservas aún
                    </Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Edificio</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Espacio</TableCell>
                                    <TableCell>Desde</TableCell>
                                    <TableCell>Hasta</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {reservas.map((r) => (
                                    <TableRow key={r._id}>
                                        <TableCell>
                                            {typeof r.spaceId === 'object' &&
                                            typeof r.spaceId.building ===
                                                'object'
                                                ? r.spaceId.building.name
                                                : '—'}
                                        </TableCell>

                                        <TableCell>
                                            {typeof r.spaceId === 'object' &&
                                            typeof r.spaceId.building ===
                                                'object'
                                                ? r.spaceId.building.address
                                                : '—'}
                                        </TableCell>

                                        <TableCell>
                                            {typeof r.spaceId === 'object'
                                                ? r.spaceId.spaceType
                                                : '—'}
                                        </TableCell>

                                        <TableCell>
                                            {dayjs(r.dateFrom).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {dayjs(r.dateTo).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </TableCell>

                                        <TableCell>{r.totalPrice}</TableCell>

                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => cancelar(r._id)}
                                            >
                                                Cancelar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <Footer />
        </>
    )
}
