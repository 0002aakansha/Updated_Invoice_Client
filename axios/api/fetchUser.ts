import { getCookie } from "@/utils/cookies";
import toast from "react-hot-toast";
import admin from "../instance/client";

export default async function fetchUser(id: string | null) {
    try {
        const { data } = await admin({
            url: `/user/${id}`,
            headers: {
                Authorization: getCookie()
            }
        })

        if (data.status === 'true') return data
        else throw new Error(data.message)

    } catch (error: any) {
        toast.error(error.response.data.message || error.message || 'An unknown error has been occured!')
    }
}