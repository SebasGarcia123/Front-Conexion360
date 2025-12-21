import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NavInicio } from '../../componentes/NavInicio'
import { Footer } from '../../componentes/Footer'
import Slider from "react-slick";
import { Divider } from '@mui/material';
import { MapaEdificios } from '../../componentes/home/MapaEdificios';
import { useLoadScript } from "@react-google-maps/api";
import { CarrouselOpinion } from "./CarrouselOpinion";


export const Home = () => {

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const { isLoaded } = useLoadScript({
                                        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
                                        });

                                        if (!isLoaded) return null;

    return (
        <>
            <NavInicio />
            <Divider />
            
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

            
            <Box
                sx={{
                    width: '100%',
                    py: 6,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2, md: 8 },
                }}
            >

                {/* Texto institucional */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: { xs: 2 },
                    }}
                    >
                    <Typography
                        variant="body1"
                        sx={{
                        textAlign: "justify",
                        maxWidth: '95%',
                        whiteSpace: "pre-line",
                        lineHeight: 1.7,
                        color: "#333",
                        }}
                >
                        En nuestra empresa creemos que trabajar bien empieza por
                        sentirse bien. Por eso creamos espacios de trabajo
                        diseñados para inspirar, conectar y potenciar tu
                        productividad. Ofrecemos oficinas privadas, escritorios
                        flexibles y salas de reuniones totalmente equipadas,
                        listas para que solo tengas que traer tu notebook y tus
                        ideas. Nos ocupamos de todo lo demás: internet de alta
                        velocidad, café ilimitado, limpieza, recepción y un
                        ambiente profesional pero relajado. Nos apasiona ver
                        cómo nuestros miembros crecen, hacen networking y
                        transforman sus proyectos en realidades. Ya seas
                        freelancer, emprendedor o parte de un equipo en
                        expansión, acá vas a encontrar un lugar donde tu trabajo
                        fluye y tus ideas se potencian. Más que un espacio,
                        somos una comunidad. Vení a conocernos y descubrí una
                        nueva forma de trabajar.
                    </Typography>
                </Box>

                {/* Carrousel */}
                <Box sx={{ width: "65%", mt: 3 }}>
                    <Slider {...carouselSettings}>
                        <Box>
                            <img
                            src="/src/assets/Comedor.png"
                            alt="Comedor"
                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                            />
                        </Box>
                        <Box>
                            <img
                            src="/src/assets/Esparcimiento.png"
                            alt="Esparcimiento"
                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                            />
                        </Box>
                        <Box>
                            <img
                            src="/src/assets/Sala de reuniones 1.png"
                            alt="Sala"
                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                            />
                        </Box>
                        <Box>
                            <img
                            src="/src/assets/Espacio3.png"
                            alt="Espacio3"
                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                            />
                        </Box>
                        <Box>
                            <img
                            src="/src/assets/Espacio4.png"
                            alt="Espacio4"
                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                            />
                        </Box>
                    </Slider>
              </Box>

            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Ubicaciones */}

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

            <Box sx={{ width: '100%', mt: 15 }}>
                <Divider />
            </Box>

            {/* Comentarios */}
            <Box>
                <Typography 
                                variant = 'h3'
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: 'Michroma',
                                    mt: '20px',
                                    mb: '30px',
                                    textDecoration: 'underline',
                                }}>
                        Lo que dicen quienes nos eligen 
                    </Typography>
                <CarrouselOpinion />
            </Box>
        </Box>
        <Footer />
        </>
    )
}
