import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

export const PrivateRoutesCliente = () => {
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('authToken')

        if (!token) {
            setLoading(false)
            return
        }

        try {
            const decoded = jwtDecode<{ role: string; exp: number }>(token)

            if (!decoded.exp) {
                setLoading(false)
                return
            }

            if (decoded.exp * 1000 < Date.now()) {
                setLoading(false)
                return
            }

            if (decoded.role !== 'cliente') {
                setLoading(false)
                return
            }

            setAuthorized(true)
        } catch (error) {
            console.error('Token inválido', error)
        } finally {
            setLoading(false)
        }
    }, [])

    if (loading) return null // o un spinner

    if (!authorized) return <Navigate to="/login" replace />

    return <Outlet />
}
