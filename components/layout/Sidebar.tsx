import { UserContext } from '@/state-management/context/user'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Sidebar = () => {
    const router = useRouter()
    const { user } = useContext(UserContext)

    return (
        <div className='h-screen bg-stone-50 p-4 w-72'>
            <div>
                <h1 className='text-2xl uppercase font-bold text-stone-800'>{user?.name.split(' ')[0]}</h1>
            </div>

            <nav className='my-8'>
                <ul>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/addClient')}
                    >Add Client</li>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/addProject')}
                    >Add Project</li>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/')}
                    >View All Clients</li>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/')}
                    >View All Projects</li>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/generateInvoice')}
                    >Generate Invoice</li>
                    <li
                        className='text-stone-800 font-semibold tracking-normal text-lg cursor-pointer my-3'
                        onClick={() => router.push('/')}
                    >Invoice History</li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar