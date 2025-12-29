import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NavInicio } from '../../componentes/home/NavInicio'
import { Footer } from '../../componentes/Footer'
import { Divider } from '@mui/material'
import { useLoadScript } from '@react-google-maps/api'
import { Opiniones } from '../../componentes/home/Opiniones'
import { Soluciones } from '../../componentes/home/Soluciones'
//import { Ubicaciones } from './Ubicaciones';
import { Servicios } from '../../componentes/home/Servicios'
//import principal from '../../assets/principal.jpg'
import foto_portada from '../../assets/foto_portada1.jpg'

export const Home = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    })
    if (!isLoaded) return null

    return (
        <>
            <NavInicio />
            {/* Titulo */}
            <Typography
                variant="h2"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',

                    fontFamily: 'Michroma',
                    fontWeight: 600,

                    mt: '100px',
                    mb: '10px',
                    py: 6, // padding vertical para que el fondo se luzca
                    px: 4,

                    background:
                        'linear-gradient(135deg, #1976d2 0%, #b0b0b0 50%, #ffffff 100%)',
                    color: '#1f1f1f',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                }}
            >
                Viví la experiencia Conexión 360°
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                }}
                >
                <Box
                    component="img"
                    src={foto_portada}
                    alt="Imagen principal"
                    sx={{
                    width: '100%',
                    maxWidth: '1600px',
                    //borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                />
                </Box>

            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Soluciones */}
            <section id="soluciones">
                <Soluciones />
            </section>

            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Opiniones */}
            <section id="opiniones">
                <Opiniones />
            </section>
            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Ubicaciones */}
            <section id="ubicaciones">{/* < Ubicaciones /> */}</section>

            {/* Servicios */}
            <section id="servicios">
                <Servicios />
            </section>

            <Footer />
        </>
    )
}
