import { Box, CssBaseline, Toolbar } from '@mui/material'
import type { ReactNode } from 'react'
import { NavAdmin } from './NavAdmin'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom'

interface Props {
    drawer: ReactNode
}

export const IndicadoresLayout = ({ drawer }: Props) => {
    const drawerWidth = 260

    return (
        <>
            <CssBaseline />
            <NavAdmin />
            <Box sx={{ display: 'flex', minHeight: 'calc(90vh - 64px)' }}>
                {/* Drawer lateral */}
                <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
                    {' '}
                    {drawer}
                </Box>{' '}
                {/* Contenido */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Toolbar />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}
