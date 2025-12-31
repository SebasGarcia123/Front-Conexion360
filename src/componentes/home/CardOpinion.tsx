import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  CardMedia,
} from '@mui/material'
import type { IOpinion } from '../../types'

interface CardOpinionProps {
  opinion: IOpinion
}

export const CardOpinion = ({ opinion }: CardOpinionProps) => {
  const ratingValue = opinion.valoration / 2 // 1–10 → 0–5 estrellas

  return (
    <Box px={1}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Imagen del espacio */}
        <CardMedia
          component="img"
          height="140"
        //   image={opinion.space.pictureUrl}
          alt="Espacio"
        />

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Valoración */}
          <Rating
            value={ratingValue}
            precision={0.5}
            readOnly
          />

          {/* Comentario */}
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            “{opinion.comment}”
          </Typography>

          {/* Nombre */}
          <Typography variant="subtitle1" fontWeight="bold">
            {opinion.name}
          </Typography>

          {/* Cargo y empresa */}
          <Typography variant="body2" color="text.secondary">
            {opinion.position} · {opinion.company}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

