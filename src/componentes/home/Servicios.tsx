import { Typography } from '@mui/material'
import { Box } from '@mui/system'
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
import '../../styles/Amenities.css'

export const Servicios = () => {
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    p: 4,
                    mt: '60px',
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'Michroma',
                        mt: '60px',
                        mb: '60px',
                    }}
                >
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
                        <span className="service-title">Area fumadores</span>
                    </div>
                    <div className="service-card">
                        <ShowerRoundedIcon className="service-icon" />
                        <span className="service-title">Duchas</span>
                    </div>
                    <div className="service-card">
                        <MedicalServicesRoundedIcon className="service-icon" />
                        <span className="service-title">Servicio médico</span>
                    </div>
                    <div className="service-card">
                        <LocalPoliceRoundedIcon className="service-icon" />
                        <span className="service-title">Seguridad 24 hs</span>
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
                        <span className="service-title">Estacionamiento</span>
                    </div>

                    <div className="service-card">
                        <PrintRoundedIcon className="service-icon" />
                        <span className="service-title">Impresoras</span>
                    </div>
                </div>
            </Box>
        </>
    )
}
