import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import { Login } from '../pages/Login'
import { Registro } from '../pages/Registro'
import { Cliente } from '../pages/cliente/Cliente'
import { NuevaReserva } from '../pages/cliente/NuevaReserva'
import { MisReservas } from '../pages/cliente/MisReservas'
import { PrivateRoutesCliente } from './PrivateRoutesCliente'
import { PrivateRoutesAdmin } from './PrivateRoutesAdmin'
import { Administrador } from '../pages/admin/Administrador'
import { AdminEstadisticas } from '../pages/admin/AdminEstadisticas'
import { AdminManageUsers } from '../pages/admin/AdminManageUsers'
import { OpcionesParaReserva } from '../pages/cliente/OpcionesParaReserva'
import { EditarPerfil } from '../pages/cliente/EditarPerfil'
import { FormularioNuevoEdificio } from '../pages/admin/FormularioNuevoEdificio'
import { FormularioNuevoEspacio } from '../pages/admin/FormularioNuevoEspacio'

export const RoutesList = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoutesCliente />}>
                        <Route path="/cliente" element={<Cliente />} />
                        <Route path="/editarPerfil" element={<EditarPerfil />} />
                        <Route path="/reserva" element={<NuevaReserva />} />
                        <Route path="/mis-reservas" element={<MisReservas />} />
                        <Route
                            path="/espacios"
                            element={<OpcionesParaReserva />}
                        />
                    </Route>
                    <Route element={<PrivateRoutesAdmin />}>
                        <Route path="/admin" element={<Administrador />} />
                        <Route
                            path="/manageUsers"
                            element={<AdminManageUsers />}
                        />
                        <Route
                        path="/nuevo/edificio"
                        element={<FormularioNuevoEdificio />}
                        />
                        <Route
                            path="/nuevo/espacio"
                            element={<FormularioNuevoEspacio />}
                        />
                        <Route
                            path="/estadisticas"
                            element={<AdminEstadisticas />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
