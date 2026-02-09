import {
    Box,
    CircularProgress,
    Typography,
    Divider,
    Button,
} from '@mui/material'
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

    const [edificiosTocados, setEdificiosTocados] = useState(false)
    const [espaciosTocados, setEspaciosTocados] = useState(false)
    const [capacidadTocada, setCapacidadTocada] = useState(false)

    useEffect(() => {
        const getSpaces = async () => {
            try {
                setLoading(true)
                const token = sessionStorage.getItem('authToken')

                if (!token) {
                    setError('Debes iniciar sesión.')
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
                        ? 'Token expirado.'
                        : 'Error al cargar espacios.'
                )
            } finally {
                setLoading(false)
            }
        }

        getSpaces()
    }, [dateDesde, dateHasta])

    /* =========================
     INICIALIZAR FILTROS TILDADOS
  ========================= */

    useEffect(() => {
        if (spaces.length === 0) return

        const edificios = Array.from(
            new Set(
                spaces.map((s) =>
                    typeof s.building === 'string' ? s.building : s.building._id
                )
            )
        )

        const tiposEspacio = Array.from(new Set(spaces.map((s) => s.spaceType)))

        const capacidades = Array.from(
            new Set(
                spaces.map((s) => {
                    if (s.capacity === 1) return '1'
                    if (s.capacity >= 2 && s.capacity <= 15)
                        return 'Entre 2 y 15'
                    if (s.capacity >= 16 && s.capacity <= 30)
                        return 'Entre 16 y 30'
                    return 'Más de 30'
                })
            )
        )

        setFiltroEdificio(edificios)
        setFiltroEspacio(tiposEspacio)
        setFiltroCapacidad(capacidades)

        setEdificiosTocados(false)
        setEspaciosTocados(false)
        setCapacidadTocada(false)
    }, [spaces])

    /* =========================
     FILTRADO FINAL
  ========================= */

    const filteredSpaces = useMemo(() => {
        // inicio → mostrar todo
        if (!edificiosTocados && !espaciosTocados && !capacidadTocada) {
            return spaces
        }

        if (edificiosTocados && filtroEdificios.length === 0) return []
        if (espaciosTocados && filtroEspacios.length === 0) return []
        if (capacidadTocada && filtroCapacidad.length === 0) return []

        return spaces.filter((s) => {
            const buildingId =
                typeof s.building === 'string' ? s.building : s.building._id

            if (
                edificiosTocados &&
                !filtroEdificios.includes(String(buildingId))
            )
                return false

            if (espaciosTocados && !filtroEspacios.includes(s.spaceType))
                return false

            if (capacidadTocada) {
                const cap = s.capacity

                const ok =
                    (filtroCapacidad.includes('1') && cap === 1) ||
                    (filtroCapacidad.includes('Entre 2 y 15') &&
                        cap >= 2 &&
                        cap <= 15) ||
                    (filtroCapacidad.includes('Entre 16 y 30') &&
                        cap >= 16 &&
                        cap <= 30) ||
                    (filtroCapacidad.includes('Más de 30') && cap > 30)

                if (!ok) return false
            }

            return true
        })
    }, [
        spaces,
        filtroEdificios,
        filtroEspacios,
        filtroCapacidad,
        edificiosTocados,
        espaciosTocados,
        capacidadTocada,
    ])

    /* =========================
     LIMPIAR FILTROS
  ========================= */

    const limpiarFiltros = () => {
        setFiltroEdificio([])
        setFiltroEspacio([])
        setFiltroCapacidad([])

        setEdificiosTocados(false)
        setEspaciosTocados(false)
        setCapacidadTocada(false)
    }

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <NavCliente />

            <Box sx={{ display: 'flex', gap: 5, flexGrow: 1, p: 2 }}>
                {/* FILTROS */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        py: 3,
                        pr: 3,
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
                        onChange={(v) => {
                            setFiltroEdificio(v)
                            setEdificiosTocados(true)
                        }}
                    />

                    <AlternativaEspacios
                        value={filtroEspacios}
                        onChange={(v) => {
                            setFiltroEspacio(v)
                            setEspaciosTocados(true)
                        }}
                    />

                    <AlternativaCapacidad
                        value={filtroCapacidad}
                        onChange={(v) => {
                            setFiltroCapacidad(v)
                            setCapacidadTocada(true)
                        }}
                    />

                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        onClick={limpiarFiltros}
                    >
                        Limpiar filtros
                    </Button>
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* RESULTADOS */}
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    {filteredSpaces.length === 0 ? (
                        <Typography
                            color="error"
                            sx={{
                                fontSize: '2rem',
                                textAlign: 'center',
                                mt: 4,
                            }}
                        >
                            No hay espacios disponibles con esas características
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {filteredSpaces.map((space) => (
                                <CardAlternativas
                                    key={space._id}
                                    space={space}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    )
}
