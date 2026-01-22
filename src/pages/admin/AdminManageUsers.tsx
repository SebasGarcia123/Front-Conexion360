import { NavAdmin } from '../../componentes/admin/NavAdmin'
import { Footer } from '../../componentes/Footer'
import { Box } from '@mui/material'
import { TablaUsuarios } from '../../componentes/admin/TablaUsuarios'
//import fondo from '../assets/foto-registro.jpg'

export const AdminManageUsers = () => {
    return (
        <>
            <NavAdmin />
            <Box
                sx={{
                    //backgroundImage: `url(${fondo})`,
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
            >
                <TablaUsuarios />
            </Box>
            <Footer />
        </>
    )
}
