import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NavInicio } from '../../componentes/home/NavInicio'
import { Footer } from '../../componentes/Footer'
import { Divider } from '@mui/material'
import { useLoadScript } from '@react-google-maps/api'
import { Opiniones } from '../../componentes/home/Opiniones'
import { Soluciones } from '../../componentes/home/Soluciones'
import { Ubicaciones } from '../../componentes/home/Ubicaciones';
import { Servicios } from '../../componentes/home/Servicios'
import foto_portada from '../../assets/foto_portada1.jpg'

export const Home = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    })
    if (!isLoaded) return null

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f4f4f4ff',
                }}
            >
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
                        py: 6,
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
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        }}
                    />
                </Box>

                <Box
                    sx={{ width: '100%', mt: 5, backgroundColor: '#f4f4f4ff' }}
                >
                    <Divider />
                </Box>

                {/* Soluciones */}
                <Box sx={{ backgroundColor: '#efe9e9ff' }}>
                    <section id="soluciones">
                        <Soluciones />
                    </section>
                </Box>
                <Box sx={{ width: '100%', mt: 5 }}>
                    <Divider />
                </Box>

                {/* Opiniones */}
                <section id="opiniones">
                    <Opiniones />
                </section>

                <Box sx={{ width: '100%', mt: 5 }}>
                    <Divider />
                </Box>

                {/* Ubicaciones */}
                <Box sx={{ backgroundColor: '#efe9e9ff' }}>
                    <section id="ubicaciones">< Ubicaciones /></section>
                </Box>

                <Box sx={{ width: '100%', mt: 5 }}>
                    <Divider />
                </Box>

                {/* Servicios */}
                <Box sx={{ backgroundColor: '#efe9e9ff' }}>
                    <section id="servicios">
                        <Servicios />
                    </section>
                </Box>
                <Footer />
            </Box>
        </>
    )
}
