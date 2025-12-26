import Slider from "react-slick";
import { Box } from "@mui/material";
import { CardOpinion } from "./CardOpinion";

const opinions = [
  {
    name: "María López",
    role: "Product Manager",
    company: "Mercado Libre",
    comment: "El espacio es excelente, cómodo y bien ubicado.",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    role: "CEO",
    company: "Startup XYZ",
    comment: "Muy buena atención y salas bien equipadas.",
    rating: 4.5,
  },
  {
    name: "Lucía Gómez",
    role: "UX Designer",
    company: "Globant",
    comment: "Ambiente moderno y tranquilo para trabajar.",
    rating: 4,
  },
  {
    name: "Carlos Díaz",
    role: "CTO",
    company: "Fintech AR",
    comment: "Excelente conectividad y soporte técnico.",
    rating: 5,
  },
  {
    name: "Sofía Ramírez",
    role: "HR Manager",
    company: "Accenture",
    comment: "Perfecto para reuniones con clientes.",
    rating: 4.5,
  },
  
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 900, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};

export const CarrouselOpinion = () => {
  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 8 } }}>
      <Slider {...settings}>
        {opinions.map((opinion, index) => (
          <CardOpinion key={index} opinion={opinion} />
        ))}
      </Slider>
    </Box>
  );
};
