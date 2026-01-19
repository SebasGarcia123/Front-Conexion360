import { Box, CircularProgress, Typography, Divider } from '@mui/material'
import { NavCliente } from '../../componentes/cliente/NavCliente'
import CardAlternativas from '../../componentes/cliente/CardAlternativas'
import { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'
import type { ISpace } from '../../types'
import { Footer } from '../../componentes/Footer'
import AlternativaEdificios from '../../componentes/cliente/AlternativaEdificios'
import AlternativaEspacios from '../../componentes/cliente/AlternativaEspacios'
import AlternativaCapacidad from '../../componentes/cliente/AlternativaCapacidad'
import AlternativaFechas from '../../componentes/cliente/AlternativaFechas'

export const OpcionesParaReserva = () => {
    const [spaces, setSpaces] = useState<ISpace[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [filtroEdificios, setFiltroEdificio] = useState<string[]>([])
    const [filtroEspacios, setFiltroEspacio] = useState<string[]>([])
    const [filtroCapacidad, setFiltroCapacidad] = useState<string[]>([])

    const [dateDesde, setDateDesde] = useState<Date | null>(null)
    const [dateHasta, setDateHasta] = useState<Date | null>(null)

    /* =========================
       DERIVED STATE
    ========================= */

    const hayFiltrosActivos = useMemo(
        () =>
            filtroEdificios.length > 0 ||
            filtroEspacios.length > 0 ||
            filtroCapacidad.length > 0,
        [filtroEdificios, filtroEspacios, filtroCapacidad]
    )

    const filteredSpaces = useMemo(() => {
        return spaces.filter((s) => {
            const buildingId =
                typeof s.building === 'string'
                    ? s.building
                    : s.building._id

            if (
                filtroEdificios.length > 0 &&
                !filtroEdificios.includes(String(buildingId))
            ) {
                return false
            }

            if (
                filtroEspacios.length > 0 &&
                !filtroEspacios.includes(s.spaceType)
            ) {
                return false
            }

            if (filtroCapacidad.length > 0) {
                const cap = s.capacity

                const cumpleCapacidad =
                    (filtroCapacidad.includes('1') && cap === 1) ||
                    (filtroCapacidad.includes('Entre 2 y 15') &&
                        cap >= 2 &&
                        cap <= 15) ||
                    (filtroCapacidad.includes('Entre 16 y 30') &&
                        cap >= 16 &&
                        cap <= 30) ||
                    (filtroCapacidad.includes('Más de 30') && cap > 30)

                if (!cumpleCapacidad) return false
            }

            return true
        })
    }, [spaces, filtroEdificios, filtroEspacios, filtroCapacidad])

    /* =========================
       EFFECTS
    ========================= */

    useEffect(() => {
        const getSpaces = async () => {
            try {
                setLoading(true)
                const token = sessionStorage.getItem('authToken')

                if (!token) {
                    setError(
                        'No se encontró token de cliente. Debes iniciar sesión.'
                    )
                    return
                }

                let url = 'http://localhost:4000/spaces'
                let params = {}

                if (dateDesde && dateHasta) {
                    url = 'http://localhost:4000/spaces/available'
                    params = {
                        dateFrom: dateDesde.toISOString(),
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
                setError(
                    error.response?.status === 401
                        ? 'No autorizado. El token puede estar expirado.'
                        : 'Ocurrió un error al cargar los espacios.'
                )
            } finally {
                setLoading(false)
            }
        }

        getSpaces()
    }, [dateDesde, dateHasta])

    /* =========================
       RENDER
    ========================= */

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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavCliente />

            <Box sx={{ display: 'flex', gap: 5, flexGrow: 1, p: 2 }}>
                {/* FILTROS */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: 3,
                        pr: 3,
                        background:
                            'linear-gradient(90deg, #f2f8f9ff, #efeaeaff)',
                    }}
                >
                    <Typography sx={{ fontSize: '1.5rem', p: 2 }}>
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

                {/* RESULTADOS */}
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
                    {!hayFiltrosActivos ? (
                        <Typography
                        color="error"
                        sx={{
                            fontSize: '2rem',   // doble de tamaño aprox
                            fontWeight: 500,
                            textAlign: 'center',
                            width: '100%',
                            mt: 4,
                        }}
                        >
                        No hay espacios disponibles con esas características
                        </Typography>
                    ) : filteredSpaces.length === 0 ? (
                        <Typography
                            color="error"
                            sx={{
                                fontSize: '2rem',   // doble de tamaño aprox
                                fontWeight: 500,
                                textAlign: 'center',
                                width: '100%',
                                mt: 4,
                            }}
                        >
                            No hay espacios disponibles con esas características
                        </Typography>
                    ) : (
                        filteredSpaces.map((space) => (
                            <CardAlternativas
                                key={space._id}
                                space={space}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    )
}

