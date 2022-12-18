import {useParams} from "react-router-dom";
import {useCreateReservation, useGetReservation, useUpdateReservation} from "../hooks/useReservations";
import {MyNavbar} from "../components/myNavbar";
import {Button, Form} from "react-bootstrap";
import {Car, Member, OptionalReservation, Reservation} from "../api/models";
import {useGetAllCars} from "../hooks/useCars";
import {useGetAllMembers} from "../hooks/useMembers";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getReservation} from "../api/calls/reservation";

export const EditReservationPage = () => {
    const id = Number(useParams().id)
    //const {data: reservation, isLoading, isError} = useGetReservation(id)
    const {data: reservation, isLoading, isError} = useQuery<Reservation>( ["reservation",id], ()=>getReservation(id), {
        onSuccess: (data: Reservation)=> setNewReservation(data)
    })
    const {data: carData} = useGetAllCars()
    const {data: memberData} = useGetAllMembers()
    const {mutate: addMutation} = useUpdateReservation(id)
    const [newReservation, setNewReservation] = useState<OptionalReservation>({...reservation})

    const handleSubmit = () => {
        addMutation(newReservation as Reservation)
    }
    const chooseCar = (car: Car) => {
        setNewReservation({...newReservation, car: car})
    }

    const chooseMember = (member: Member) => {
        setNewReservation({...newReservation, member: member})
    }


    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load reservations!</h1>

    return (<>
        <MyNavbar/>
        <Form>
            <label>
                carId
                <input className="form-control mb-3" disabled value={newReservation.car?.id}/>
            </label>
            <label>
                memberId
                <input className="form-control mb-3" disabled value={newReservation.member?.id}/>
            </label>
            <label>
                RentalDate
                <input className="form-control mb-3" type={"date"}
                       defaultValue={newReservation.rentalDate?.toString()}
                       onChange={(e) => setNewReservation({...newReservation, rentalDate: e.target.valueAsDate})}/>
            </label>

            <Button variant="primary"
                    onClick={() => handleSubmit()}>submit to update</Button>
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
                                <Button variant="primary" onClick={() => {chooseCar(car)}}>Choose car</Button>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">firstName</th>
                <th scope="col">lastName</th>
                <th scope="col">city</th>
                <th scope="col">street</th>
                <th scope="col">zip</th>
                <th scope="col">ranking</th>
                <th scope="col">approved</th>
                <th scope="col">Choose</th>
            </tr>
            </thead>
            <tbody>
            {memberData?.map((member: Member) => {
                    return (
                        <tr key={member.id}>
                            <th scope="row">{member.id}</th>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.city}</td>
                            <td>{member.street}</td>
                            <td>{member.zip}</td>
                            <td>{member.ranking}</td>
                            <td>{String(member.approved)}</td>
                            <td>
                                <Button variant="primary" onClick={() => chooseMember(member)}>Choose member</Button>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>

    </>)

}