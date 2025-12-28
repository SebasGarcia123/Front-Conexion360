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
    Divider,Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField
} from '@mui/material'
import dayjs from 'dayjs'
import type { Reservation } from '../../types'
import { NavCliente } from '../../componentes/NavCliente'
import { Footer } from '../../componentes/Footer'
import { Checkbox, FormControlLabel } from '@mui/material'


export const MisReservas = () => {

    const [reservas, setReservas] = useState<Reservation[]>([])
    const [verTodas, setVerTodas] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
    const [rating, setRating] = useState<number>(5)
    const [nombre, setNombre] = useState('')
    const [cargo, setCargo] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [comentario, setComentario] = useState('')


    const valorarReserva = (res: Reservation) => {
      setSelectedReservation(res)
      setOpen(true)
    }
    
    const abrirConfirmacion = (id: string) => {
        setReservaSeleccionada(id);
        setOpenDialog(true);
      };

      const cerrarConfirmacion = () => {
        setOpenDialog(false);
        setReservaSeleccionada(null);
      };

      const confirmarCancelacion = async () => {
        if (!reservaSeleccionada) return;

        const token = sessionStorage.getItem("authToken");
        await axios.patch(
          `http://localhost:4000/reservations/${reservaSeleccionada}/cancel`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );


        cerrarConfirmacion();
        getData();
      };


    const getData = async () => {
        const token = sessionStorage.getItem('authToken')
        const r = await axios.get('http://localhost:4000/reservations/my', {
            headers: { Authorization: `Bearer ${token}` },
        })
        setReservas(r.data)
    }

    const enviarValoracion = async () => {
  if (!selectedReservation) return

  const token = sessionStorage.getItem("authToken")

  await axios.post(
    "http://localhost:4000/opinions",
    {
      reservation: selectedReservation._id,
      space: typeof selectedReservation.spaceId === 'object'
        ? selectedReservation.spaceId._id
        : selectedReservation.spaceId,
      name: nombre,
      position: cargo,
      company: empresa,
      comment: comentario,
      valoration: rating,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  // limpiar
  setOpen(false)
  setNombre('')
  setCargo('')
  setEmpresa('')
  setComentario('')
  setRating(5)

  getData()
}


    useEffect(() => {
        getData()
    }, [])

    const reservasFiltradas = verTodas
    ? reservas
    : reservas.filter(r => r.status === 'Pendiente')

    return (
        <>
            <NavCliente />

            <Box sx={{ minHeight: '100vh', px: 2 }}>
                {reservas.length === 0 ? (
                    <Typography textAlign="center" mt={5}>
                        No tenés reservas aún
                    </Typography>
                ) : (
                    <>
                        <FormControlLabel 
                        sx = {{display:'flex', padding: 3, mt: 1, color: 'blue', backgroundColor: '#ffffffff'}}
                        control={
                            <Checkbox
                                checked={verTodas}
                                onChange={(e) => setVerTodas(e.target.checked)}
                            />
                        }
                        label="VER TODAS MIS RESERVAS"
                    />
                    <Box sx={{ width: '100%'}}>
                      <Divider />
                    </Box>
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
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {reservasFiltradas.map((r) => (
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
                                          {r.status === 'Cumplida' && (
                                            <Typography sx={{
                                              backgroundColor: 'success.main',
                                              color: 'white',
                                              px: 2,
                                              py: 0.5,
                                              borderRadius: 1,
                                              //fontStyle: 'italic',
                                              display: 'inline-block',
                                            }}>
                                              Cumplida
                                            </Typography>
                                          )}

                                          {r.status === 'Cancelada' && (
                                            <Typography color="text.secondary" fontStyle="italic">
                                              Reserva cancelada
                                            </Typography>
                                          )}

                                          {r.status === 'Pendiente' && (
                                            <Button
                                              variant="contained"
                                              color="error"
                                              onClick={() => abrirConfirmacion(r._id)}
                                            >
                                              Cancelar
                                            </Button>
                                          )}

                                          {r.status === 'PorValorar' && (
                                            <Button
                                              variant="contained"
                                              color="success"
                                              onClick={() => valorarReserva(r)}
                                            >
                                              Valorar
                                            </Button>
                                          )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>

                )}
                <Dialog open={openDialog} onClose={cerrarConfirmacion}>
  <DialogTitle>Cancelar reserva</DialogTitle>

  <DialogContent>
    ¿Estás seguro de que querés cancelar esta reserva?
    Esta acción no se puede deshacer.
  </DialogContent>

  <DialogActions>
    <Button onClick={cerrarConfirmacion}>
      No, volver
    </Button>

    <Button
      onClick={confirmarCancelacion}
      color="error"
      variant="contained"
    >
      Sí, cancelar
    </Button>
  </DialogActions>
</Dialog>

<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
  <DialogTitle>Valorar espacio</DialogTitle>

  <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

    <TextField
      label="Nombre y apellido"
      fullWidth
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />

    <TextField
      label="Cargo"
      fullWidth
      value={cargo}
      onChange={(e) => setCargo(e.target.value)}
    />

    <TextField
      label="Empresa"
      fullWidth
      value={empresa}
      onChange={(e) => setEmpresa(e.target.value)}
    />

    <TextField
      label="Comentario"
      multiline
      rows={3}
      fullWidth
      value={comentario}
      onChange={(e) => setComentario(e.target.value)}
    />

    <Box>
      <Typography gutterBottom>Valoración</Typography>
      <Rating
        value={rating}
        max={10}
        onChange={(_, value) => setRating(value || 0)}
      />
    </Box>

  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancelar</Button>

    <Button
      variant="contained"
      onClick={enviarValoracion}
      disabled={!nombre || !empresa}
    >
      Enviar valoración
    </Button>
  </DialogActions>
</Dialog>



            </Box>

            <Footer />
        </>
    )
}
