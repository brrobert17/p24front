import {useQuery} from "@tanstack/react-query";
import {getAllCars, getCar} from "../api/calls/car";
import {getMember} from "../api/calls/member";

export const useGetAllCars = () => {
    return useQuery(["cars"], getAllCars)
}
export const useGetCar = (id: number) => {
    return useQuery(["car", id], () => getCar(id))
}