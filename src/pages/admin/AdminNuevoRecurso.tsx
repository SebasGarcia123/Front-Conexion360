import { useState } from 'react'
import { Footer } from '../../componentes/Footer'
import { NavAdmin } from '../../componentes/admin/NavAdmin'
import { Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import { FormularioNuevoEdificio } from './FormularioNuevoEdificio'
import { FormularioNuevoEspacio } from './FormularioNuevoEspacio'

const drawerWidth = 240
const navbarHeight = 0
const footerHeight = '10vh'

export const AdminNuevoRecurso = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    return (
        <>
            <NavAdmin />

            {/* CONTENEDOR PRINCIPAL (Drawer + contenido) */}
            <Box
                sx={{
                    display: 'flex',
                    minHeight: `calc(100vh - ${navbarHeight}px - ${footerHeight})`,
                }}
            >
                {/* DRAWER */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            paddingTop: '20px',

                            // 👇 evita que invada navbar y footer
                            marginTop: `${navbarHeight}px`,
                            height: `calc(100vh - ${navbarHeight}px - ${footerHeight})`,
                            position: 'relative',
                        },
                    }}
                >
                    <List>
                        <ListItemButton
                            onClick={() => setSelectedOption('nuevoEdificio')}
                        >
                            <ListItemText primary="NUEVO EDIFICIO" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => setSelectedOption('nuevoEspacio')}
                        >
                            <ListItemText primary="NUEVO ESPACIO" />
                        </ListItemButton>
                    </List>
                </Drawer>

                {/* CONTENIDO CENTRAL */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        marginTop: `${navbarHeight}px`,
                    }}
                >
                    {selectedOption === 'nuevoEdificio' && (
                        <FormularioNuevoEdificio />
                    )}
                    {selectedOption === 'nuevoEspacio' && (
                        <FormularioNuevoEspacio />
                    )}
                </Box>
            </Box>

            {/* FOOTER */}
            <Box sx={{ height: footerHeight }}>
                <Footer />
            </Box>
        </>
    )
}
