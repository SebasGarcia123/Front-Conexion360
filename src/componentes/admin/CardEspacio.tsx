import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material'

interface CardEspacioProps {
  imageUrl: string
  buildingName: string
  address: string
  city: string
  capacity: number
  pricePerDay: number
  onEdit: () => void
}

export const CardEspacio = ({
  imageUrl,
  buildingName,
  address,
  city,
  capacity,
  pricePerDay,
  onEdit,
}: CardEspacioProps) => {
  return (
    <Card
      sx={{
        width: '8cm',
        height: '11cm',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* IMAGEN */}
      <CardMedia
        component="img"
        image={imageUrl}
        alt={buildingName}
        sx={{
          height: '55%',
          objectFit: 'cover',
        }}
      />

      {/* CONTENIDO */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {buildingName}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {address}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {city}
          </Typography>

          <Typography variant="body2" mt={1}>
            Capacidad: {capacity}
          </Typography>

          <Typography variant="body2">
            ${pricePerDay} / día
          </Typography>
        </Box>

        {/* BOTÓN */}
        <Button
          variant="outlined"
          size="small"
          onClick={onEdit}
          sx={{ alignSelf: 'flex-end', mt: 1 }}
        >
          Editar
        </Button>
      </CardContent>
    </Card>
  )
}
