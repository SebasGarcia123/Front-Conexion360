import { Card, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface Props {
    onClick: () => void
}

export const CardCrearEspacio = ({ onClick }: Props) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                width: '8cm',
                height: '11cm',
                borderRadius: 3,
                border: '2px dashed',
                borderColor: 'grey.400',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '0.25s',
                '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                    transform: 'scale(1.03)',
                },
            }}
        >
            <Box textAlign="center">
                <AddIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                <Typography variant="subtitle1" fontWeight={600}>
                    Nuevo espacio
                </Typography>
            </Box>
        </Card>
    )
}
