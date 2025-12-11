import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { NavInicio } from '../componentes/NavInicio'
import { Footer } from '../componentes/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

    return (
        <>
            <NavInicio />
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#f5f5f5',
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
                
                {/* <Box
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                    }}
                >
                    <Box
                        component="img"
                        src={foto}
                        alt="Portada"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}
                    />
                </Box> */}
            </Box>
            <Footer />
        </>
    )
}
// import React from "react";
// import Slider from "react-slick";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Rating,
// } from "@mui/material";

// // Estilos del carrusel
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export const Home = () => {
//   const carouselSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const spaces = [
//     { name: "Espacio Premium Centro", rating: 4.8 },
//     { name: "Cowork Palermo", rating: 4.5 },
//     { name: "Oficinas Nordelta", rating: 4.7 },
//   ];

//   return (
//     <Box>
//       {/* NAVBAR */}
//       <AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             WeWork App
//           </Typography>

//           <Box sx={{ display: "flex", gap: 4 }}>
//             <Button color="inherit" href="#ubicaciones">Ubicaciones</Button>
//             <Button color="inherit" href="#soluciones">Soluciones</Button>
//             <Button color="inherit" href="#empresas">Grandes Empresas</Button>
//           </Box>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button variant="outlined" color="primary">Registrarse</Button>
//             <Button variant="contained" color="primary">Ingresar</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* SEPARACIÓN DE NAVBAR */}
//       <Toolbar />

//       {/* CARRUSEL */}
//       <Box sx={{ width: "100%", mt: 3 }}>
//         <Slider {...carouselSettings}>
//           <Box>
//             <img
//               src="https://images.unsplash.com/photo-1559134491-1e1b07f1f87d"
//               alt="cowork1"
//               style={{ width: "100%", height: "500px", objectFit: "cover" }}
//             />
//           </Box>
//           <Box>
//             <img
//               src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
//               alt="cowork2"
//               style={{ width: "100%", height: "500px", objectFit: "cover" }}
//             />
//           </Box>
//           <Box>
//             <img
//               src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
//               alt="cowork3"
//               style={{ width: "100%", height: "500px", objectFit: "cover" }}
//             />
//           </Box>
//         </Slider>
//       </Box>

//       {/* SECCIÓN DE VALORACIONES */}
//       <Container sx={{ mt: 8 }}>
//         <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
//           Valoraciones de Nuestros Espacios
//         </Typography>

//         <Grid container spacing={3}>
//           {spaces.map((space, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Card sx={{ p: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     {space.name}
//                   </Typography>
//                   <Rating value={space.rating} precision={0.1} readOnly />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* SECCIONES PARA ANCLAR */}
//       <Box id="ubicaciones" sx={{ height: "400px", mt: 10 }}>
//         <Typography variant="h4">Sección Ubicaciones (a desarrollar)</Typography>
//       </Box>

//       <Box id="soluciones" sx={{ height: "400px", mt: 10 }}>
//         <Typography variant="h4">Sección Soluciones (a desarrollar)</Typography>
//       </Box>

//       <Box id="empresas" sx={{ height: "400px", mt: 10 }}>
//         <Typography variant="h4">Sección Grandes Empresas (a desarrollar)</Typography>
//       </Box>

//       {/* FOOTER */}
//       <Box sx={{ height: "200px", background: "#f5f5f5", mt: 10 }}>
//         <Typography sx={{ p: 4 }}>Footer (se desarrollará aparte)</Typography>
//       </Box>
//     </Box>
//   );
// }
