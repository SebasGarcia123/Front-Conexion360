import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { MapaEdificios } from "./MapaEdificios"

export const Ubicaciones = () => {
  return (
    <Box sx = {{ marginTop: '60px' }}>
                    <Typography 
                                variant = 'h3'
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: 'Michroma',
                                    mt: '20px',
                                    mb: '80px',
                                    textDecoration: 'underline',
                                }}>
                        Nuestras ubicaciones 
                    </Typography>
                <Box sx = {{display: 'flex',
                        flexDirection: 'row',
                        gap: 4,
                        alignItems: 'flex-start',
                        width: '90%',
                        }}>
                
                    <Box sx={{ flex: 3 }}>
                    <Typography>
                        Nuestros edificios están ubicados en zonas clave de la ciudad, cuidadosamente seleccionadas para ofrecerte conectividad, comodidad 
                        y prestigio. A través del mapa interactivo podés explorar cada ubicación y encontrar el espacio que mejor se adapte a tu equipo y 
                        a tu ritmo de trabajo.
                        Cada sede se encuentra cerca de centros comerciales, transporte público, áreas gastronómicas y polos empresariales, facilitando el 
                        acceso tanto para vos como para tus clientes y colaboradores.
                        Ya sea que busques un espacio privado, una oficina para tu equipo o un puesto flexible, nuestras ubicaciones te permiten estar en el centro de las oportunidades, con la libertad de elegir cómo y dónde trabajar.
                        Explorá el mapa, descubrí nuestros edificios y encontrá el lugar ideal para potenciar tu negocio.
                    </Typography>
                    </Box>
                    <Box sx={{ flex: 7, height: 400 }}>
                        <MapaEdificios />
                    </Box>
                </Box>
            </Box>
  )
}