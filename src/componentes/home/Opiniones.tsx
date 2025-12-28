import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CarrouselOpinion } from './CarrouselOpinion'

export const Opiniones = () => {
    return (
        <Box>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontFamily: 'Michroma',
                    mt: '100px',
                    mb: '100px',
                }}
            >
                Lo que dicen quienes nos eligen
            </Typography>
            <CarrouselOpinion />
        </Box>
    )
}
