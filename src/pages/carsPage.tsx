import {Car} from "../api/models";
import {useGetAllCars} from "../hooks/useCars";
import {MyNavbar} from "../components/myNavbar";

export const CarsPage = () => {
    const {data: carData, isError, isLoading} =useGetAllCars()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load reservations!</h1>
    return(<>
        <MyNavbar/>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">brand</th>
                <th scope="col">model</th>
                <th scope="col">pricePerDay</th>
                <th scope="col">discount</th>
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
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
    </>)

}