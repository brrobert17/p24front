import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createReservation, deleteReservation, getAllReservations, getReservation, updateReservation} from 'api/calls/reservation'
import {toast} from "react-toastify";
import {Reservation} from "../api/models";
import 'react-toastify/dist/ReactToastify.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const useGetAllReservations = () => {
    return useQuery(["reservations"], getAllReservations)
}

export const useDeleteReservation = () => {

    const queryClient = useQueryClient()
    return useMutation(
        (id: number) => deleteReservation(id),

        //optimistic updates :D :D :D
        {
            onMutate: async (id) => {

                //no interference
                await queryClient.cancelQueries(["reservations"])

                //snapshot
                const snapshot = queryClient.getQueryData<Reservation>(["reservations"])

                //mod cache
                //@ts-ignore
                queryClient.setQueryData(["reservations"], (oldReservations: Reservation[]) => oldReservations.filter(reservation => reservation.id !== id))

                return snapshot
            },
            onError: (_error, _data, {snapshot}: any) => {

                //restoration
                queryClient.setQueryData(["reservations"], snapshot)
                toast.error("Error updating")
            },
            onSettled: () => {

                //invalidate => re-fetch
                queryClient.invalidateQueries(["reservations"])
            },
            onSuccess: () => {
                toast.success("Yaay! Success!")
            }
        }
    )


}

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Reservation) => createReservation(data),
        {
            onError: (_error, _data) => {

                toast.error("Error creating Reservation")
            },
            onSettled: () => {
                // Invalidate
                queryClient.invalidateQueries(["reservations"])

            },
            onSuccess: () => {
                toast.success("Reservation created successfully")
                setTimeout(()=> window.location.href= "/reservations", 3000)
            }
        }
    )

}

export const useGetReservation = (id: number) => {
    return useQuery(["reservation", id], () => getReservation(id))
}

export const useUpdateReservation = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Reservation) => updateReservation(id, data),
        {
            onError: (_error, _data) => {
                toast.error("Error creating Reservation")
            },
            onSettled: () => {
                // Invalidate
                queryClient.invalidateQueries(["reservations"])

            },
            onSuccess: () => {
                toast.success("Reservation created successfully")
                setTimeout(()=> window.location.href= "/reservations", 3000)
            }
        }
    )

}
