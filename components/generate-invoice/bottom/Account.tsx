import { UserContext } from '@/state-management/context/user'
import React, { useContext } from 'react'

const Account = () => {
    const { user } = useContext(UserContext)
    return (
        <div>
            <h1 className='uppercase font-semibold'>{user?.name}</h1>
            <h5 className='font-semibold'>A/C No: {user?.account.acc_no}</h5>
            <h5 className='font-semibold'>BANK: {user?.account.bank}</h5>
            <h5 className='font-semibold'>IFSC: {user?.account.ifsc}</h5>
        </div>
    )
}

export default Account