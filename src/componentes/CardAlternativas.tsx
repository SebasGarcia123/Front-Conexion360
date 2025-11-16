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
import { IconButton } from '@mui/material'
import '../styles/Amenities.css'
import WifiRoundedIcon from '@mui/icons-material/WifiRounded'
import WeekendRoundedIcon from '@mui/icons-material/WeekendRounded'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded'
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded'
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded'
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded'
import { PagoTarjeta } from './PagoTarjeta'

type Props = {
    space: ISpace
}

export default function CardAlternativas({ space }: Props) {
    const [open, setOpen] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const handleOpenInfo = () => setOpenInfo(true)
    const handleCloseInfo = () => setOpenInfo(false)
    const [reservationData, setReservationData] = useState(null);

    const handleFinishReservation = () => {
    setOpen(false)
    setOpenPayment(false)
}

    return (
        <>
            {/* ----------------- CARD ----------------- */}
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
                <CardActionArea onClick={handleOpenInfo}>
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
                            variant="body2"
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

            {/* ----------------- MODAL ----------------- */}
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
                      onClose={() => setOpen(false)}
                      onGoToPayment={(data) => {
                          setReservationData(data)       // ← guardo los datos
                          setOpen(false)
                          setOpenPayment(true)
                      }}
                  />

                </Box>
            </Modal>

            {/* 🔹 MODAL DE INFO */}
            <Modal open={openInfo} onClose={handleCloseInfo}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        height: 550,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <Button
                        onClick={handleCloseInfo}
                        sx={{
                            position: 'absolute',
                            top: 30,
                            right: 30,
                            minWidth: '30px',
                            height: '30px',
                            bgcolor: 'red',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '50%',
                            '&:hover': {
                                bgcolor: '#f40505ff',
                            },
                        }}
                    >
                        X
                    </Button>
                    <Typography variant="h6" mb={2}>
                        Servicios
                    </Typography>
                    <div className="services-container">
                        <div className="service-card">
                            <WifiRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Wifi de alta velocidad
                            </span>
                        </div>

                        <div className="service-card">
                            <WeekendRoundedIcon className="service-icon" />
                            <span className="service-title">Sala de estar</span>
                        </div>

                        <div className="service-card">
                            <VpnKeyRoundedIcon className="service-icon" />
                            <span className="service-title">Lockers</span>
                        </div>

                        <div className="service-card">
                            <SportsEsportsRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Sector esparcimiento
                            </span>
                        </div>

                        <div className="service-card">
                            <RestaurantRoundedIcon className="service-icon" />
                            <span className="service-title">Comedor</span>
                        </div>

                        <div className="service-card">
                            <SmokingRoomsRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Area fumadores
                            </span>
                        </div>

                        <div className="service-card">
                            <ShowerRoundedIcon className="service-icon" />
                            <span className="service-title">Duchas</span>
                        </div>

                        <div className="service-card">
                            <PrintRoundedIcon className="service-icon" />
                            <span className="service-title">Impresoras</span>
                        </div>

                        <div className="service-card">
                            <MedicalServicesRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Servicio médico
                            </span>
                        </div>

                        <div className="service-card">
                            <LocalPoliceRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Seguridad 24 hs
                            </span>
                        </div>

                        <div className="service-card">
                            <FreeBreakfastRoundedIcon className="service-icon" />
                            <span className="service-title">Cafeteria</span>
                        </div>

                        <div className="service-card">
                            <FitnessCenterRoundedIcon className="service-icon" />
                            <span className="service-title">Gimnasio</span>
                        </div>

                        <div className="service-card">
                            <DirectionsCarFilledRoundedIcon className="service-icon" />
                            <span className="service-title">
                                Estacionamiento
                            </span>
                        </div>
                    </div>
                </Box>
            </Modal>
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
                      onCancel={() => setOpenPayment(false)}
                      onFinish={handleFinishReservation}
                  />
              </Box>
          </Modal>

        </>
    )
}
