export interface Building {
    _id: string
    name: string
    address: string
    city: string
    country: string
    latitude: number
    longitude: number
    postalCode: string
    isActive: boolean
}

export interface IBuildingBySpace {
    _id: string
    name: string
    address: string
    city: string
}

export interface Reservation {
    _id: string
    userId: string
    dateFrom: string
    dateTo: string
    spaceId: string | ISpace
        // | string
        // | {
        //       _id: string
        //       spaceType: string
        //       building: Building | string
        //   }
    totalPrice: number
    isActive: boolean
    rentType: RentType
    status: status
}

export type status = 'Pendiente'| 'PorValorar' | 'Cancelada' | 'Cumplida'

export interface ReservationRequest {
    userId: string
    dateFrom: string
    dateTo: string
    spaceId:
        | string
        | {
              _id: string
              spaceType: string
              building: Building | string
          }
    totalPrice: number
    rentType: RentType
}

export type RentType = 'Dia' | 'Semana' | 'Mes' | 'Año'

export type ValidationError = {
    location: string
    msg: string
    path: string
    type: string
    value: string
}

export type ErrorMessages = {
    user?: string
    password?: string
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
    document?: string
    role?: string
}

export interface ISpace {
    _id: string
    building: IBuildingBySpace | string
    pictureUrl: string
    spaceType: string
    description: string
    capacity: number
    pricePerDay: number
    isActive: boolean
}

export type spaceType = 'Piso' | 'Oficina' | 'Escritorio co-working'

export interface CreateBuildingRequest {
    name: string
    address: string
    city: string
    country: string
    postalCode: string
    latitude: number
    longitude: number
}

export interface IOpinion {
    _id: string
    name: string
    position: string
    company: string
    comment: string
    date: Date
    reservation: Reservation | string
    space: ISpace
    valoration: number
}
