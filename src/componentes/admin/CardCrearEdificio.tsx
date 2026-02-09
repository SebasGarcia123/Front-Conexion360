import { Card, CardActionArea, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface CardCrearEdificioProps {
    onClick: () => void
}

export const CardCrearEdificio = ({ onClick }: CardCrearEdificioProps) => {
    return (
        <Card
            sx={{
                width: '8cm',
                height: '8cm',
                borderRadius: 3,
                border: '2px dashed',
                borderColor: 'primary.main',
                backgroundColor: 'background.paper',
                transition: 'all 0.25s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                    }}
                >
                    <AddIcon
                        sx={{
                            fontSize: 64,
                            color: 'primary.main',
                        }}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary.main"
                    >
                        Crear edificio
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    )
}
