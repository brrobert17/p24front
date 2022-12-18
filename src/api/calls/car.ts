import axios from "lib/axios.config";
import {Car} from "api/models";

export const getAllCars = async (): Promise<Car[]> => {
    return axios.get("/cars").then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const getCar = async (id: number): Promise<Car> => {
    return axios.get("/cars/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const createCar = async (car: Car): Promise<Car> => {
    return axios.post(`/cars`, car).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const updateCar = async (id: number, newCar: Car): Promise<Car> => {
    return axios.put("/cars/" + id, newCar).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const deleteCar = async (id: number): Promise<Car> => {
    return axios.delete("/cars/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}