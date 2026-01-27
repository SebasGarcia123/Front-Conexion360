import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import { Login } from '../pages/Login'
import { Registro } from '../pages/Registro'
import { Cliente } from '../pages/cliente/Cliente'
//import { NuevaReserva } from '../pages/cliente/NuevaReserva'
import { MisReservas } from '../pages/cliente/MisReservas'
import { PrivateRoutesCliente } from './PrivateRoutesCliente'
import { PrivateRoutesAdmin } from './PrivateRoutesAdmin'
import { Administrador } from '../pages/admin/Administrador'
import { AdminManageUsers } from '../pages/admin/AdminManageUsers'
import { OpcionesParaReserva } from '../pages/cliente/OpcionesParaReserva'
import { EditarPerfil } from '../pages/cliente/EditarPerfil'
import { FormularioNuevoEdificio } from '../pages/admin/FormularioNuevoEdificio'
import { FormularioNuevoEspacio } from '../pages/admin/FormularioNuevoEspacio'
import { EdicionUsuario } from '../pages/admin/EdicionUsuario'
import { IndicadoresLayout } from '../componentes/admin/IndicadoresLayout'
import { DrawerEdificios } from '../componentes/admin/DrawerEdificios'
import { DrawerEspacios } from '../componentes/admin/DrawerEspacios'
import { DrawerReservas } from '../componentes/admin/DrawerReservas.tsx'
import { DrawerNegocio } from '../componentes/admin/DrawerNegocio'
import { ReservasPorEdificio } from '../pages/admin/indicadores/ReservasPorEdificio'
import { ValoracionPorEdificio } from '../pages/admin/indicadores/ValoracionPorEdificio'
import { ValoracionPorEspacio } from '../pages/admin/indicadores/ValoracionPorEspacio'
import { ReservasPorEspacio } from '../pages/admin/indicadores/ReservasPorEspacio'
import { FacturacionPorEdificio } from '../pages/admin/indicadores/FacturacionPorEdificio'
import { FacturacionPorEspacio } from '../pages/admin/indicadores/FacturacionPorEspacio'
import { FacturacionTotal } from '../pages/admin/indicadores/FacturacionTotal'
import { ReservasPromedioEdificio } from '../pages/admin/indicadores/ReservasPromedioEdificio'
import { ReservasPromedioEspacio } from '../pages/admin/indicadores/ReservasPromedioEspacio'
import { ReservasMejorValorada } from '../pages/admin/indicadores/ReservasMejorValorada'
import { ReservasTotales } from '../pages/admin/indicadores/ReservasTotales'

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
                        {/* <Route path="/reserva" element={<NuevaReserva />} /> */}
                        <Route path="/mis-reservas" element={<MisReservas />} />
                        <Route
                            path="/espacios"
                            element={<OpcionesParaReserva />}
                        />
                    </Route>
                    <Route element={<PrivateRoutesAdmin />}>
                        <Route path="/admin" element={<Administrador />} />
                        <Route path="/manageUsers" element={<AdminManageUsers />} />
                        <Route path="/edicionUsuario/:id" element={<EdicionUsuario />} />
                        <Route path="/nuevo/edificio" element={<FormularioNuevoEdificio />} />
                        <Route path="/nuevo/espacio" element={<FormularioNuevoEspacio />} />
                        <Route path="/indicadores/edificios" element={<IndicadoresLayout drawer={<DrawerEdificios />} />}>
                            <Route path="reservas" element={<ReservasPorEdificio />} />
                            <Route path="valoracion" element={<ValoracionPorEdificio />} />
                        </Route>
                        <Route path="/indicadores/espacios" element={<IndicadoresLayout drawer={<DrawerEspacios />} />}>
                            <Route path="reservas" element={<ReservasPorEspacio />} />
                            <Route path="valoracion" element={<ValoracionPorEspacio />} />
                        </Route>
                        <Route path="/indicadores/reservas" element={<IndicadoresLayout drawer={<DrawerReservas />} />}>
                            <Route path="promedio-edificio" element={<ReservasPromedioEdificio />} />
                            <Route path="promedio-espacio" element={<ReservasPromedioEspacio />} />
                            <Route path="mejor-valorada" element={<ReservasMejorValorada />} />
                            <Route path="totales" element={<ReservasTotales />} />
                        </Route>
                        <Route path="/indicadores/negocio" element={<IndicadoresLayout drawer={<DrawerNegocio />} />}>
                            <Route path="edificio" element={<FacturacionPorEdificio />} />
                            <Route path="espacio" element={<FacturacionPorEspacio />} />
                            <Route path="total" element={<FacturacionTotal />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
