import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
    Paper,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    TextField,
    Stack,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'
import type { TableComponents } from 'react-virtuoso'
import { useNavigate } from 'react-router-dom'

interface UserData {
    _id: string
    user: string
    firstName: string
    lastName: string
    isActive: boolean
}

export const TablaUsuarios = () => {
    const [users, setUsers] = useState<UserData[]>([])
    const [search, setSearch] = useState('')
    const [showAll, setShowAll] = useState(false)

    const navigate = useNavigate()
    const token = sessionStorage.getItem('authToken')

    const deactivateUser = async (id: string) => {
        try {
            await axios.patch(
                `http://localhost:4000/users/${id}/deactivate`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // Actualizamos el estado local (soft delete)
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? { ...u, isActive: false } : u))
            )
        } catch (error) {
            console.error('Error al desactivar usuario', error)
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('http://localhost:4000/users', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUsers(res.data)
        }

        getUsers()
    }, [token])

    /** 🔍 Filtrado + activos/inactivos */
    const filteredUsers = useMemo(() => {
        const value = search.toLowerCase()

        return users.filter((u) => {
            if (!showAll && !u.isActive) return false

            return (
                u.user.toLowerCase().includes(value) ||
                u.firstName.toLowerCase().includes(value) ||
                u.lastName.toLowerCase().includes(value)
            )
        })
    }, [users, search, showAll])

    const VirtuosoTableComponents: TableComponents<UserData> = {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table
                {...props}
                sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
            />
        ),
        TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableHead {...props} ref={ref} />
        )),
        TableRow,
        TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableBody {...props} ref={ref} />
        )),
    }

    const fixedHeaderContent = () => (
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
                <strong>Usuario</strong>
            </TableCell>
            <TableCell>
                <strong>Nombre</strong>
            </TableCell>
            <TableCell>
                <strong>Apellido</strong>
            </TableCell>
            <TableCell>
                <strong>Acciones</strong>
            </TableCell>
        </TableRow>
    )

    const rowContent = (_: number, row: UserData) => (
        <>
            <TableCell>{row.user}</TableCell>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>
                <Stack direction="row" spacing={1} alignItems="center">
                    {row.isActive ? (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deactivateUser(row._id)}
                            sx={{ minWidth: 100 }}
                        >
                            DESACTIVAR
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            disabled
                            sx={{
                                minWidth: 120, // 🔥 mantiene ancho
                                bgcolor: '#e0e0e0',
                                color: '#555',
                                cursor: 'default',
                            }}
                        >
                            INACTIVO
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/edicionUsuario/${row._id}`)}
                        sx={{ minWidth: 100 }}
                    >
                        EDITAR
                    </Button>
                </Stack>
            </TableCell>
        </>
    )

    return (
        <Paper
            sx={{
                height: 480,
                width: '75%',
                margin: '20px auto',
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* 🔍 Filtro + checkbox */}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <TextField
                    fullWidth
                    label="Buscar por usuario, nombre o apellido"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: { xs: '100%', md: '50%' } }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showAll}
                            onChange={(e) => setShowAll(e.target.checked)}
                        />
                    }
                    label="Ver todos los usuarios"
                />
            </Stack>

            <TableVirtuoso
                data={filteredUsers}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    )
}
