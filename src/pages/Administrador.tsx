import { NavAdmin } from '../componentes/NavAdmin'
import { Footer } from '../componentes/Footer'
import { Box } from '@mui/material'
import fondo from '../assets/foto-registro.jpg'

export const Administrador = () => {
    return (
        <>
            <NavAdmin />
            <Box
                sx={{
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '83vh',
                    width: '100%',
                    alignItems: 'center',
                    pt: 4,
                    flexGrow: 1,
                }}
            ></Box>
            <Footer />
        </>
    )
}
