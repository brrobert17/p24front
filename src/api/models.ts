export interface Member {
    id?: number,
    firstName: string,
    lastName: string,
    city: string,
    street: string,
    zip: number,
    ranking: number,
    approved: boolean
}

export interface OptionalMember {
    id?: number,
    firstName?: string,
    lastName?: string,
    city?: string,
    street?: string,
    zip?: number,
    ranking?: number,
    approved?: boolean
}

export interface Car {
    id?: number,
    brand: string,
    model: string,
    pricePerDay: number,
    bestDiscount: number
}
export interface OptionalCar {
    id?: number,
    brand?: string,
    model?: string,
    pricePerDay?: number,
    bestDiscount?: number
}

export interface Reservation {
    id?: number,
    rentalDate: Date,
    reservationDate: Date,
    car: Car,
    member: Member
}
export interface OptionalReservation {
    id?: number,
    rentalDate?: Date | null,
    reservationDate?: Date | null,
    car?: Car | null,
    member?: Member | null
}