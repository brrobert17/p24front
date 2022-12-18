import {Button, Form, FormCheck} from "react-bootstrap"
import {useState} from "react";
import {Member, OptionalMember} from "../api/models";
import {useCreateMember} from "../hooks/useMembers";
import {redirect} from "react-router-dom";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {MyNavbar} from "../components/myNavbar";

export const CreateMemberPage = () => {
    const emptyMember = {
        firstName: "",
        lastName: "",
        city: "",
        street: "",
        zip: 0,
        ranking: 0,
        approved: false
    }
    const [newMember, setNewMember] = useState<Member>(emptyMember)
    const {mutate: addMutation} = useCreateMember()

    const handleSubmit = () => {
        addMutation(newMember)
        setNewMember(emptyMember)
        window.location.href= "/members"
    }

    return (<>
        <MyNavbar/>
        <Form>
            <label>
                firstName
                <input className="form-control mb-3" value={newMember.firstName}
                       onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}/>
            </label>
            <label>
                lastName
                <input className="form-control mb-3" value={newMember.lastName}
                       onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}/>
            </label>
            <label>
                city
                <input className="form-control mb-3" value={newMember.city}
                       onChange={(e) => setNewMember({...newMember, city: e.target.value})}/>
            </label>
            <label>
                street
                <input className="form-control mb-3" value={newMember.street}
                       onChange={(e) => setNewMember({...newMember, street: e.target.value})}/>
            </label>
            <label>
                zip
                <input className="form-control mb-3" type={"number"} value={newMember.zip}
                       onChange={(e) => setNewMember({...newMember, zip: Number(e.target.value)})}/>
            </label>
            <label>
                ranking
                <input className="form-control mb-3" type={"number"} value={newMember.ranking}
                       onChange={(e) => setNewMember({...newMember, ranking: Number(e.target.value)})}/>
            </label>
            <FormCheck>
                <FormCheckInput type={"checkbox"}
                                className={"mb-3"}
                                checked={newMember.approved}
                                onChange={(e)=> setNewMember({...newMember, approved: !newMember.approved})}/>
                <FormCheckLabel>
                    Approved
                </FormCheckLabel>
            </FormCheck>
            <Button variant="primary"
                    onClick={() => handleSubmit()}>submit to create</Button>
        </Form>

    </>)

}