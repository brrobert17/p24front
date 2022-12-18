import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createMember, deleteMember, getAllMembers, getMember, updateMember} from 'api/calls/member'
import {toast} from "react-toastify";
import {Member, OptionalMember} from "../api/models";
import 'react-toastify/dist/ReactToastify.css'

export const useGetAllMembers = () => {
    return useQuery(["members"], getAllMembers)
}

export const useDeleteMember = () => {

    const queryClient = useQueryClient()
    return useMutation(
        (id: number) => deleteMember(id),

        //optimistic updates :D :D :D
        {
            onMutate: async (id) => {

                //no interference
                await queryClient.cancelQueries(["members"])

                //snapshot
                const snapshot = queryClient.getQueryData<Member>(["members"])

                //mod cache
                //@ts-ignore
                queryClient.setQueryData(["members"], (oldMembers: Member[]) => oldMembers.filter(member => member.id !== id))

                return snapshot
            },
            onError: (_error, _data, {snapshot}: any) => {

                //restoration
                queryClient.setQueryData(["members"], snapshot)
                toast.error("Error updating")
            },
            onSettled: () => {

                //invalidate => re-fetch
                queryClient.invalidateQueries(["members"])
            },
            onSuccess: () => {
                toast.success("Yaay! Success!")
            }
        }
    )


}

export const useCreateMember = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Member) => createMember(data),
        {
            onError: (_error, _data, { snapshot }: any) => {
                // restore
                queryClient.setQueryData(["members"], snapshot)
                toast.error("Error creating Member")
            },
            onSettled: () => {
                // Invalidate
                queryClient.invalidateQueries(["members"])

            },
            onSuccess: () => {
                toast.success("Member created successfully")
            }
        }
    )

}

export const useGetMember = (id: number) => {
    return useQuery(["member", id], () => getMember(id))
}

export const useUpdateMember = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Member) => updateMember(id, data),
        {
            onError: (_error, _data, { snapshot }: any) => {
                // restore
                queryClient.setQueryData(["members"], snapshot)
                toast.error("Error creating Member")
            },
            onSettled: () => {
                // Invalidate
                queryClient.invalidateQueries(["members"])

            },
            onSuccess: () => {
                toast.success("Member created successfully")
            }
        }
    )

}
