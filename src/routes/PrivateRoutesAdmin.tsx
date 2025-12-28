import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const PrivateRoutesAdmin = () => {
    const token = sessionStorage.getItem('authToken')
    if (!token) return <Navigate to="/login" />

    const decoded = jwtDecode(token) as { role: string; exp: number }

    if (decoded.exp * 1000 < Date.now()) return <Navigate to="/login" />
    if (decoded.role !== 'admin') return <Navigate to="/" />

    return <Outlet />
}
