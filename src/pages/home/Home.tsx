import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NavInicio } from '../../componentes/home/NavInicio'
import { Footer } from '../../componentes/Footer'
import { Divider } from '@mui/material';
import { useLoadScript } from "@react-google-maps/api";
import { Opiniones } from '../../componentes/home/Opiniones';
import { Soluciones } from '../../componentes/home/Soluciones';
//import { Ubicaciones } from './Ubicaciones';
import { Servicios } from '../../componentes/home/Servicios';


export const Home = () => {

    const { isLoaded } = useLoadScript({
                                        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
                                        });
                                        if (!isLoaded) return null;

    return (
        <>
            <NavInicio />
            <Divider />
            {/* Titulo */}
            <Typography 
                            variant = 'h2'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontFamily: 'Michroma',
                                marginTop: '40px',
                                marginBottom: '10px',
                            }}>
                Viví la experiencia Conexión 360° 
            </Typography>

            {/* Soluciones */}
            <Soluciones />

            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Comentarios */}
            <Opiniones />
            
            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Ubicaciones */}
            {/* < Ubicaciones /> */}

            {/* Servicios */}
            <Servicios />

            <Footer />
        </>
    )
}
