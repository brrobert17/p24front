import axios from "lib/axios.config";
import {Member} from "api/models";

export const getAllMembers = async (): Promise<Member[]> => {
    return axios.get("/members").then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const getMember = async (id: number): Promise<Member> => {
    return axios.get("/members/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const createMember = async (member: Member): Promise<Member> => {
    return axios.post(`/members`, member).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const updateMember = async (id: number, newMember: Member): Promise<Member> => {
    return axios.put("/members/" + id, newMember).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}

export const deleteMember = async (id: number): Promise<Member> => {
    return axios.delete("/members/" + id).then(res => res.data).catch(err => {
        console.log("Origin: API calls", err)
        throw err
    })
}
