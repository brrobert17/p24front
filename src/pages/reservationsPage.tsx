import {useDeleteReservation, useGetAllReservations} from "../hooks/useReservations";
import {Button} from "react-bootstrap";
import {Reservation} from "../api/models";
import {MyNavbar} from "../components/myNavbar";

export const ReservationsPage = () => {
    const { data: reservationData, isLoading, isError } = useGetAllReservations()
    const { mutate: deleteMutation } = useDeleteReservation()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load reservations!</h1>

    return (
        <>
            <MyNavbar/>
            <Button variant={"primary"} href={"/members"}>Make a reservation</Button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">rentalDate</th>
                    <th scope="col">reservationDate</th>
                    <th scope="col">car</th>
                    <th scope="col">member</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                {reservationData?.map((reservation: Reservation) => {
                        return (
                            <tr key={reservation.id}>
                                <th scope="row">{reservation.id}</th>
                                <td>{reservation.rentalDate.toString()}</td>
                                <td>{reservation.reservationDate.toString()}</td>
                                <td>{reservation.car.id}</td>
                                <td>{reservation.member.id}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {reservation.id && deleteMutation(reservation.id)}}>Delete</Button>
                                </td>
                                <td>
                                    <Button variant="warning" onClick={() => window.location.href = `/reservation/edit/${reservation.id}`}>Edit</Button>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>

        </>
    )

}