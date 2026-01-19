import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import FormLabel from '@mui/material/FormLabel'

interface AlternativaFechasProps {
    desde: Date | null
    hasta: Date | null
    onChangeDesde: (date: Date | null) => void
    onChangeHasta: (date: Date | null) => void
}

export default function AlternativaFechas({
    desde,
    hasta,
    onChangeDesde,
    onChangeHasta,
}: AlternativaFechasProps) {
    const today = dayjs() // fecha mínima (hoy)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormLabel sx={{ margin: 3 }}>Fechas disponibles</FormLabel>

            {/* Fecha DESDE */}
            <DesktopDatePicker
                label="Desde"
                value={desde ? dayjs(desde) : null}
                minDate={today}
                onChange={(value) =>
                    onChangeDesde(value ? value.toDate() : null)
                }
                slotProps={{ textField: { fullWidth: true } }}
                sx={{ marginLeft: 3, marginY: 2, width: 200 }}
            />

            {/* Fecha HASTA */}
            <DesktopDatePicker
                label="Hasta"
                value={hasta ? dayjs(hasta) : null}
                minDate={desde ? dayjs(desde) : today}
                onChange={(value) =>
                    onChangeHasta(value ? value.toDate() : null)
                }
                slotProps={{ textField: { fullWidth: true } }}
                sx={{ marginLeft: 3, marginY: 2, width: 200 }}
            />
        </LocalizationProvider>
    )
}
