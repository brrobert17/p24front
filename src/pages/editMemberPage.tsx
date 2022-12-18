import {useState} from "react";
import {Member, OptionalMember} from "../api/models";
import {useCreateMember, useGetMember, useUpdateMember} from "../hooks/useMembers";
import {Button, Form, FormCheck} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useParams} from "react-router-dom";
import {MyNavbar} from "../components/myNavbar";

export const EditMemberPage = () => {

    const id = Number(useParams().id)
    const [editedMember, setEditedMember] = useState<OptionalMember>({})
    const { data: member, isLoading, isError } = useGetMember(id)
    const { mutate: updateMutate } = useUpdateMember(id)

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Oops! Somethings wrong!</h1>

    const handleSubmit = () => {
        updateMutate({...member, ...editedMember})
        setEditedMember({})
        window.location.href= "/members"
    }

    return (<>
        <MyNavbar/>
        <Form>
            <label>
                firstName
                <input className="form-control mb-3"
                       defaultValue={member?.firstName}
                       onChange={(e) => setEditedMember({...editedMember, firstName: e.target.value})}/>
            </label>
            <label>
                lastName
                <input className="form-control mb-3" defaultValue={member?.lastName}
                       onChange={(e) => setEditedMember({...editedMember, lastName: e.target.value})}/>
            </label>
            <label>
                city
                <input className="form-control mb-3"  defaultValue={member?.city}
                       onChange={(e) => setEditedMember({...editedMember, city: e.target.value})}/>
            </label>
            <label>
                street
                <input className="form-control mb-3"  defaultValue={member?.street}
                       onChange={(e) => setEditedMember({...editedMember, street: e.target.value})}/>
            </label>
            <label>
                zip
                <input className="form-control mb-3" type={"number"}  defaultValue={member?.zip}
                       onChange={(e) => setEditedMember({...editedMember, zip: Number(e.target.value)})}/>
            </label>
            <label>
                ranking
                <input className="form-control mb-3" type={"number"}  defaultValue={member?.ranking}
                       onChange={(e) => setEditedMember({...editedMember, ranking: Number(e.target.value)})}/>
            </label>
            <FormCheck>
                <FormCheckInput type={"checkbox"}
                                className={"mb-3"}
                                defaultChecked={member?.approved}
                                onChange={(e)=> setEditedMember({...editedMember, approved: !editedMember.approved})}/>
                <FormCheckLabel>
                    Approved
                </FormCheckLabel>
            </FormCheck>
            <Button variant="primary"
                    onClick={() => handleSubmit()}>submit to edit</Button>
        </Form>

    </>)
    }