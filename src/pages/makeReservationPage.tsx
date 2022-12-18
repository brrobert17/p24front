import {useState} from "react";
import {Car, Member, OptionalCar, OptionalMember, OptionalReservation, Reservation} from "../api/models";
import {useCreateMember, useGetAllMembers, useGetMember} from "../hooks/useMembers";
import {Button, Form, FormCheck} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useParams} from "react-router-dom";
import {useGetAllCars, useGetCar} from "../hooks/useCars";
import {useCreateReservation} from "../hooks/useReservations";
import axios from "axios";
import {getCar} from "../api/calls/car";
import {MyNavbar} from "../components/myNavbar";
import {toast} from "react-toastify";
import error = toast.error;

export const MakeReservationPage = () => {

    const id = Number(useParams().id)
    const {mutate: addMutation} = useCreateReservation()
    const {data: memberData, isLoading, isError} = useGetMember(id)
    const {data: carData} = useGetAllCars()
    const emptyReservation: OptionalReservation = {
        rentalDate: new Date(),
        reservationDate: new Date(),
        car: null,
        member: null
    }
    const [newReservation, setNewReservation] = useState<OptionalReservation>(emptyReservation)

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load reservations!</h1>

    const handleSubmit = () => {
        addMutation(newReservation as Reservation)
    }
    const choose = (car: Car) => {
        setNewReservation({...newReservation, member: memberData, car: car})
    }

    return (<>
        <MyNavbar/>
        <Form>
            <label>
                carId
                <input className="form-control mb-3" disabled value={newReservation.car?.id}/>
            </label>
            <label>
                memberId
                <input className="form-control mb-3" disabled value={memberData?.id}/>
            </label>
            <label>
                RentalDate
                <input className="form-control mb-3" type={"date"}
                       defaultValue={new Date('2022-01-01').toString()}
                       onChange={(e) => setNewReservation({...newReservation, rentalDate: e.target.valueAsDate})}/>
            </label>

            <Button variant="primary"
                    onClick={() => handleSubmit()}>submit to create</Button>
        </Form>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">brand</th>
                <th scope="col">model</th>
                <th scope="col">pricePerDay</th>
                <th scope="col">discount</th>
                <th scope="col">Choose car</th>
            </tr>
            </thead>
            <tbody>
            {carData?.map((car: Car) => {
                    return (
                        <tr key={car.id}>
                            <th scope="row">{car.id}</th>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.pricePerDay}</td>
                            <td>{car.bestDiscount}</td>
                            <td>
                                <Button variant="primary" onClick={() => {
                                    car && choose(car)
                                }}>Choose car</Button>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>

    </>)

}