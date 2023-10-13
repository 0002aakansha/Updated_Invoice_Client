import { loginType } from "@/types/types";
import admin from "../instance/client";
import toast from "react-hot-toast";

export default async function login(value: loginType) {
    try {
        const { data } = await admin({
            url: '/user/login',
            method: 'POST',
            data: JSON.stringify(value)
        })
        
        if (data.status === 'true') return data
        else throw new Error(data.message)

    } catch (error: any) {
        toast.error(error.response.data.message || error.message || 'An unknown error has been occured, Please try again later!')
    }
}