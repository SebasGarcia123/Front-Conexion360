import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Slider from 'react-slick'

export const Soluciones = () => {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <>
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'Michroma',
                        mt: '100px',
                    }}
                >
                    Nuestras soluciones
                </Typography>
            </Box>
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
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: { xs: 2 },
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'justify',
                            maxWidth: '95%',
                            whiteSpace: 'pre-line',
                            lineHeight: 1.7,
                            color: '#333',
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
                <Box sx={{ width: '65%', mt: 3 }}>
                    <Slider {...carouselSettings}>
                        <Box>
                            <img
                                src="/src/assets/Comedor.png"
                                alt="Comedor"
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Box>
                            <img
                                src="/src/assets/Esparcimiento.png"
                                alt="Esparcimiento"
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Box>
                            <img
                                src="/src/assets/Sala de reuniones 1.png"
                                alt="Sala"
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Box>
                            <img
                                src="/src/assets/Espacio3.png"
                                alt="Espacio3"
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Box>
                            <img
                                src="/src/assets/Espacio4.png"
                                alt="Espacio4"
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Slider>
                </Box>
            </Box>
        </>
    )
}
