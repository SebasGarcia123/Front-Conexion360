import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const BotonLogout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('authToken')
        navigate('/login')
    }

    return (
        <Button color="primary" variant="contained" onClick={handleLogout}>
            Cerrar Sesión
        </Button>
    )
}
