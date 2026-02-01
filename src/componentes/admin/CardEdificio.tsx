import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

interface CardEdificioProps {
  urlImage: string
  name: string
  address: string
  city: string
  country: string
}

export const CardEdificio = ({
  urlImage,
  name,
  address,
  city,
  country,
}: CardEdificioProps) => {
  return (
    <Card
      sx={{
        width: '8cm',
        height: '8cm',
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
      <CardMedia
        component="img"
        image={urlImage}
        alt={name}
        sx={{
          height: '65%',
          objectFit: 'cover',
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            noWrap
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {address}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {city}, {country}
        </Typography>
      </CardContent>
    </Card>
  )
}
