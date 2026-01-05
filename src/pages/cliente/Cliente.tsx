import { Box } from '@mui/material'
import { Footer } from '../../componentes/Footer'
import { NavCliente } from '../../componentes/cliente/NavCliente'
import fondo from '../../assets/foto-registro.jpg'

export const Cliente = () => {
    return (
        <>
            <NavCliente />
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
