import { getCookie } from "@/utils/cookies"
import { client } from "../instance/client"
import toast from "react-hot-toast"

export default async function fetchClientProjects(id: string | undefined) {
    try {
        const { data } = await client({
            url: `/companies/project/${id}`,
            headers: {
                Authorization: getCookie()
            }
        })

        if (data.status === 'true') return data.allListedProjects[0].projects
        else throw new Error(data.message)

    } catch (error: any) {
        toast.error(error.response.data.message || error.message || 'An unknown error has been occured!')
    }
}