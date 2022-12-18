import axios from "lib/axios.config";
import {Reservation} from "api/models";

export const getAllReservations = async (): Promise<Reservation[]> => {
    return axios.get("/reservations").then(res=> res.data).catch(err=>{
        console.log("Origin: API calls", err)
        throw err
    })
}

export const getReservation = async (id: number): Promise<Reservation> => {
    return axios.get("/reservations/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const createReservation = async (reservation: Reservation): Promise<Reservation> => {
    return axios.post(`/reservations`, reservation).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const updateReservation = async (id: number, newReservation: Reservation): Promise<Reservation> => {
    return axios.put("/reservations/" + id, newReservation).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const deleteReservation = async (id: number): Promise<Reservation> => {
    return axios.delete("/reservations/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}