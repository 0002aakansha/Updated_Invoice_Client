import fetchUser from "@/axios/api/fetchUser";
import { childrenProps, dataProps, userContextType, userType } from "@/types/types";
import { createContext, useState } from "react";

const userContextDefaultValues: userContextType = {
    user: {
        name: '',
        email: '',
        gstin: '',
        pan: '',
        account: {
            acc_no: '',
            bank: '',
            ifsc: ''
        },
        address: {
            street: '',
            city: '',
            state: '',
            pin: '',
            country: ''
        },
        contact: ''
    },
    setUser: () => { },
    isLoading: false,
    setIsLoading: () => { }
};

export const UserContext = createContext<userContextType>(userContextDefaultValues);

export default function UserProvider({ children }: childrenProps) {
    const [isLoading, setLoading] = useState(false);
    const [user, setuser] = useState<userType>();

    const setUser = async (id: string | null) => {
        const { user } = await fetchUser(id)
        setuser(user)
    }

    const setIsLoading = (value: boolean) => {
        setLoading(value)
    }

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
