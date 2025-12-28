import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Button from '@mui/material/Button'
import { TableVirtuoso } from 'react-virtuoso'
import type { TableComponents } from 'react-virtuoso'

interface UserData {
    _id: string
    user: string
    role: { _id: string; name: string }
}

export const CustomerTable = () => {
    const [users, setUsers] = useState<UserData[]>([])

    const token = sessionStorage.getItem('authToken')

    const getUsers = async () => {
        const res = await axios.get('http://localhost:4000/users', {
            headers: { Authorization: `Bearer ${token}` },
        })
        setUsers(res.data)
    }

    const deactivateUser = async (id: string) => {
        await axios.patch(
            `http://localhost:4000/users/${id}/deactivate`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
        setUsers((prev) => prev.filter((u) => u._id !== id))
    }

    const makeAdmin = async (id: string) => {
        await axios.patch(
            `http://localhost:4000/users/${id}/makeAdmin`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
        setUsers((prev) =>
            prev.map((u) =>
                u._id === id ? { ...u, role: { ...u.role, name: 'admin' } } : u
            )
        )
    }

    useEffect(() => {
        getUsers()
    }, [])

    const VirtuosoTableComponents: TableComponents<UserData> = {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props: React.HTMLAttributes<HTMLTableElement>) => (
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
            <TableCell sx={{ width: '20%' }}>
                <strong>Usuario</strong>
            </TableCell>
            <TableCell sx={{ width: '20%' }}>
                <strong>Rol</strong>
            </TableCell>
            <TableCell sx={{ width: '20%' }}>
                <strong>Acciones</strong>
            </TableCell>
        </TableRow>
    )

    const rowContent = (_: number, row: UserData) => (
        <>
            <TableCell>{row.user}</TableCell>
            <TableCell>{row.role.name}</TableCell>
            <TableCell>
                <Button onClick={() => deactivateUser(row._id)}>
                    Eliminar
                </Button>
                <Button onClick={() => makeAdmin(row._id)}>Hacer Admin</Button>
            </TableCell>
        </>
    )

    return (
        <Paper
            sx={{
                height: 400,
                width: '60%',
                margin: '20px auto',
                border: '1px solid #d1d1d1',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden',
            }}
        >
            <TableVirtuoso
                data={users}
                components={{
                    ...VirtuosoTableComponents,
                    Table: (props) => (
                        <Table
                            {...props}
                            sx={{
                                borderCollapse: 'separate',
                                tableLayout: 'fixed',
                                '& th, & td': {
                                    borderBottom: '1px solid #e0e0e0',
                                },
                            }}
                        />
                    ),
                }}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    )
}
