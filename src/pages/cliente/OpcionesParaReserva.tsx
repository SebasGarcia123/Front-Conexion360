import { Box, CircularProgress, Typography } from '@mui/material'
import { NavCliente } from '../../componentes/cliente/NavCliente'
import CardAlternativas from '../../componentes/CardAlternativas'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import type { ISpace } from '../../types'
import { Footer } from '../../componentes/Footer'
import AlternativaEdificios from '../../componentes/AlternativaEdificios'
import AlternativaEspacios from '../../componentes/AlternativaEspacios'
import { Divider } from '@mui/material'
import AlternativaCapacidad from '../../componentes/AlternativaCapacidad'
import AlternativaFechas from '../../componentes/AlternativaFechas'

export const OpcionesParaReserva = () => {
    const [spaces, setSpaces] = useState<ISpace[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [filtroEdificios, setFiltroEdificio] = useState<string[]>([])
    const [filtroEspacios, setFiltroEspacio] = useState<string[]>([])
    const [filtroCapacidad, setFiltroCapacidad] = useState<string[]>([])
    const [dateDesde, setDateDesde] = useState<Date | null>(null)
    const [dateHasta, setDateHasta] = useState<Date | null>(null)

    const filteredSpaces = spaces.filter((s) => {
        // Filtrar por edificio
        const buildingId =
            typeof s.building === 'string' ? s.building : s.building._id

        if (
            filtroEdificios.length > 0 &&
            !filtroEdificios.includes(String(buildingId))
        ) {
            return false
        }

        // Filtrar por tipo de espacio
        if (
            filtroEspacios.length > 0 &&
            !filtroEspacios.includes(s.spaceType)
        ) {
            return false
        }

        // Filtrar por capacidad
        if (filtroCapacidad.length > 0) {
            const cap = s.capacity

            let cumpleCapacidad = false

            if (filtroCapacidad.includes('1') && cap === 1)
                cumpleCapacidad = true
            if (
                filtroCapacidad.includes('Entre 2 y 15') &&
                cap >= 2 &&
                cap <= 15
            )
                cumpleCapacidad = true
            if (
                filtroCapacidad.includes('Entre 16 y 30') &&
                cap >= 16 &&
                cap <= 30
            )
                cumpleCapacidad = true
            if (filtroCapacidad.includes('Más de 30') && cap > 30)
                cumpleCapacidad = true

            if (!cumpleCapacidad) return false
        }

        return true
    })

    useEffect(() => {
    const getSpaces = async () => {
        try {
            setLoading(true)  // opcional: mostrar loading al cambiar fechas
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                setError('No se encontró token de cliente. Debes iniciar sesión.')
                setLoading(false)
                return
            }

            let url = 'http://localhost:4000/spaces'
            let params = {}

            // Si hay fechas, usar la ruta de disponibilidad
            if (dateDesde && dateHasta) {
                url = 'http://localhost:4000/spaces/available'
                params = {
                    dateFrom: dateDesde.toISOString(), // 🔹 pasar como ISO
                    dateTo: dateHasta.toISOString(),
                }
            }

            const { data } = await axios.get<ISpace[]>(url, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            })

            setSpaces(data)
        } catch (err) {
            const error = err as AxiosError
            console.error(error)
            if (error.response?.status === 401) {
                setError('No autorizado. El token puede estar expirado.')
            } else {
                setError('Ocurrió un error al cargar los espacios.')
            }
        } finally {
            setLoading(false)
        }
    }

    getSpaces()
}, [dateDesde, dateHasta]) // 🔹 ahora se ejecuta cada vez que cambian las fechas


    // Agrega los tildes a todos los filtros

    useEffect(() => {
    if (spaces.length === 0) return

    const edificios = Array.from(
        new Set(
            spaces.map((s) =>
                typeof s.building === 'string'
                    ? s.building
                    : s.building._id
            )
        )
    )

    const tiposEspacio = Array.from(
        new Set(spaces.map((s) => s.spaceType))
    )

    const capacidades = ['1', 'Entre 2 y 15', 'Entre 16 y 30', 'Más de 30']

    setFiltroEdificio(edificios)
    setFiltroEspacio(tiposEspacio)
    setFiltroCapacidad(capacidades)
    }, [spaces])


    if (loading) {
        return (
            <>
                <NavCliente />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <NavCliente />

            {/* Contenido principal */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    flexGrow: 1,
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        //gap: 1,
                        py: 3,
                        pr: 3,
                        background:
                            'linear-gradient(90deg, #f2f8f9ff, #efeaeaff)',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            //margin: 2,
                            marginBottom: 3,
                            fontSize: '1.5rem',
                            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
                            display: 'block',
                            width: 300,
                            padding: 2,
                        }}
                    >
                        Filtros
                    </Typography>
                    <AlternativaFechas
                        desde={dateDesde}
                        hasta={dateHasta}
                        onChangeDesde={setDateDesde}
                        onChangeHasta={setDateHasta}
                    />
                    <AlternativaEdificios
                        value={filtroEdificios}
                        onChange={setFiltroEdificio}
                    />

                    <AlternativaEspacios
                        value={filtroEspacios}
                        onChange={setFiltroEspacio}
                    />

                    <AlternativaCapacidad
                        value={filtroCapacidad}
                        onChange={setFiltroCapacidad}
                    />
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        p: 2,
                        my: 5,
                        flexGrow: 1,
                    }}
                >
                    {filteredSpaces.length === 0 ? (
                    <Typography>No hay espacios disponibles para estas fechas y filtros.</Typography>
                ) : (
                    filteredSpaces.map((space) => (
                        <CardAlternativas key={space._id} space={space} />
                    ))
                )}

                </Box>
            </Box>

            <Footer />
        </Box>
    )
}
