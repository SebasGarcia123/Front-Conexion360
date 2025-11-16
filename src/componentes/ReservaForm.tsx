import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import axios from 'axios'
import { useState, useEffect } from 'react'
import type { ISpace, RentType } from '../types'

dayjs.extend(isBetween)

type Props = {
  space: ISpace
  onGoToPayment: (data: ReservationData) => void
}

export type ReservationData = {
  userId: string
  spaceId: string
  buildingId: string
  dateFrom: string
  dateTo: string
  totalPrice: number
  rentType: RentType
}

export const ReservaForm = ({ space, onGoToPayment }: Props) => {
  const [reservasExistentes, setReservasExistentes] = useState<
    { dateFrom: string; dateTo: string }[]
  >([])

  useEffect(() => {
    const getData = async () => {
      if (!space?._id) return
      const token = sessionStorage.getItem('authToken')
      const r = await axios.get(
        `http://localhost:4000/reservations/space/${space._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  const [objData, setObjData] = useState<ReservationData>({
    userId: '',
    spaceId: space._id,
    buildingId:
      typeof space.building === 'string'
        ? space.building
        : (space.building?._id ?? ''),
    dateFrom: '',
    dateTo: '',
    totalPrice: space.pricePerDay,
    rentType: 'Dia',
  })

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

  const handleDateOrRentChange = async (
    date: Dayjs | null,
    rentType?: RentType
  ) => {
    if (!date || !space) return

    const type = rentType || objData.rentType
    if (!type) return

    let endDate = date

    switch (type) {
      case 'Dia':
        endDate = date.endOf('day') // <--- ahora fecha final local
        date = date.startOf('day')   // <--- fecha inicio local
        break
      case 'Semana':
        endDate = date.add(1, 'week').endOf('day')
        date = date.startOf('day')
        break
      case 'Mes':
        endDate = date.add(1, 'month').endOf('day')
        date = date.startOf('day')
        break
      case 'Año':
        endDate = date.add(1, 'year').endOf('day')
        date = date.startOf('day')
        break
    }

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

  const sendData = () => {
    onGoToPayment(objData)
  }

  return (
    <Box sx={{ p: 3, width: '100%', maxWidth: 600 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
        Generar reserva
      </Typography>

      <Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Edificio"
              fullWidth
              value={
                typeof space.building === 'string'
                  ? 'Edificio no disponible'
                  : space.building.name
              }
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Espacio"
              fullWidth
              value={space.spaceType}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Tipo de renta"
              fullWidth
              value={objData.rentType}
              onChange={handleRentTypeChange}
            >
              {['Dia', 'Semana', 'Mes', 'Año'].map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                disabled={!objData.rentType}
                label="Fecha inicio"
                value={objData.dateFrom ? dayjs(objData.dateFrom) : null}
                onChange={(date) => {
                  if (!date) return
                  handleDateOrRentChange(date)
                }}
                shouldDisableDate={isDateReserved}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="Fecha fin"
                value={objData.dateTo ? dayjs(objData.dateTo) : null}
                readOnly
              />
            </Grid>
          </LocalizationProvider>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Precio total"
              fullWidth
              value={objData.totalPrice}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 3 }} onClick={sendData}>
          Realizar pago
        </Button>
      </Box>
    </Box>
  )
}
