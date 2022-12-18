import {Member} from 'api/models'
import { Button } from 'react-bootstrap'
import {useDeleteMember, useGetAllMembers} from "../hooks/useMembers";
import {MyNavbar} from "../components/myNavbar";

export const MembersPage = () => {

    const { data: memberData, isLoading, isError } = useGetAllMembers()
    const { mutate: deleteMutation } = useDeleteMember()

    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops! Couldn't load members!</h1>

    return (
        <>
            <MyNavbar/>
            <Button variant={"primary"} href={"/member/create"}>Create New Member</Button>
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
                    <th scope="col">Book</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
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
                                    <Button variant="primary" onClick={() => window.location.href = `/reservation/member/id/${member.id}`}>Book</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => {member.id && deleteMutation(member.id)}}>Delete</Button>
                                </td>
                                <td>
                                    <Button variant="warning" onClick={() => window.location.href = `/member/edit/${member.id}`}>Edit</Button>
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