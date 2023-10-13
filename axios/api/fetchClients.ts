import { getCookie } from "@/utils/cookies"
import { client } from "../instance/client"
import toast from "react-hot-toast"

export default async function fetchClient() {
    try {
        const { data } = await client({
            url: `/companies`,
            headers: {
                Authorization: getCookie()
            }
        })

        if (data.status === 'true') return data.allListedCompanies
        else throw new Error(data.message)

    } catch (error: any) {
        toast.error(error.response.data.message || error.message || 'An unknown error has been occured!')
    }
}