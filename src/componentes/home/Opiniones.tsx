import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CarrouselOpinion } from './CarrouselOpinion'

export const Opiniones = () => {
    return (
        <Box sx={{ backgroundColor: '#efe9e9ff', height: 600 }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontFamily: 'Michroma',
                    mt: '60px',
                    mb: '60px',
                    p: 4,
                    height: '600',
                }}
            >
                Lo que dicen quienes nos eligen
            </Typography>
            <CarrouselOpinion />
        </Box>
    )
}
