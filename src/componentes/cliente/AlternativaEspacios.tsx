import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    CircularProgress,
} from '@mui/material'
import type { ISpace } from '../../types'

interface AlternativaEspaciosProps {
    value: string[]
    onChange: (value: string[]) => void
}

export default function AlternativaEspacios({
    value,
    onChange,
}: AlternativaEspaciosProps) {
    const [spaces, setSpaces] = useState<ISpace[]>([])
    const [selected, setSelected] = useState<string[]>(value ?? [])
    const [loading, setLoading] = useState<boolean>(true)

    // 🔹 Cargar espacios desde la API
    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const token = sessionStorage.getItem('authToken')
                const res = await axios.get<ISpace[]>(
                    'http://localhost:4000/spaces',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setSpaces(res.data.filter((s) => s.isActive))
            } catch (error) {
                console.error('Error al obtener espacios:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSpaces()
    }, [])

    // 🔹 Sincronizar con el padre si `value` cambia
    useEffect(() => {
        if (value) setSelected(value)
    }, [value])

    // 🔹 Manejar selección múltiple
    const handleToggle = (type: string) => {
        const updated = selected.includes(type)
            ? selected.filter((t) => t !== type)
            : [...selected, type]

        setSelected(updated)
        onChange(updated) // <-- Avisar al padre
    }

    if (loading) return <CircularProgress sx={{ margin: 2 }} />

    // 🔹 Sacar tipos únicos
    const uniqueTypes = [...new Set(spaces.map((s) => s.spaceType))]

    return (
        <FormControl sx={{ margin: 2 }}>
            <FormLabel sx={{ margin: 1 }}>Tipo de espacio</FormLabel>

            {uniqueTypes.map((type) => (
                <FormControlLabel
                    key={type}
                    control={
                        <Checkbox
                            checked={selected.includes(type)}
                            onChange={() => handleToggle(type)}
                        />
                    }
                    label={type}
                />
            ))}
        </FormControl>
    )
}
