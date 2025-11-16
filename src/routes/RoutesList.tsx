import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Ubicaciones } from '../pages/Ubicaciones'
import { Soluciones } from '../pages/Soluciones'
import { GrandesEmpresas } from '../pages/GrandesEmpresas'
import { Registro } from '../pages/Registro'
import { Cliente } from '../pages/Cliente'
import { NuevaReserva } from '../pages/NuevaReserva'
import { MisReservas } from '../pages/MisReservas'
import { PrivateRoutesCliente } from './PrivateRoutesCliente'
import { PrivateRoutesAdmin } from './PrivateRoutesAdmin'
import { Administrador } from '../pages/Administrador'
import { AdminNuevoRecurso } from '../pages/AdminNuevoRecurso'
import { AdminEstadisticas } from '../pages/AdminStatistics'
import { AdminManageUsers } from '../pages/AdminManageUsers'
import { OpcionesParaReserva } from '../pages/OpcionesParaReserva'  

export const RoutesList = () => {
  return (
        <>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ubicaciones" element={<Ubicaciones />} />
                    <Route path="/soluciones" element={<Soluciones />} />
                    <Route
                        path="/grandes_empresas"
                        element={<GrandesEmpresas />}
                    />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                    <Route element = { <PrivateRoutesCliente />} >
                        <Route path="/cliente" element={<Cliente />} />
                        <Route path="/reserva" element={<NuevaReserva />} />
                        <Route path="/mis-reservas" element={<MisReservas />} />
                        <Route path="/espacios" element={<OpcionesParaReserva />} />
                    </Route>
                    <Route element = { <PrivateRoutesAdmin />} >
                        <Route path="/admin" element={<Administrador />} />
                        <Route path="/manageUsers" element={<AdminManageUsers />} />
                        <Route path="/nuevoRecurso" element={<AdminNuevoRecurso />} />
                        <Route path="/estadisticas" element={<AdminEstadisticas />} />
                    </Route>
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}
