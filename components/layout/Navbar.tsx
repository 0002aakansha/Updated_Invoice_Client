import { useSelector } from 'react-redux'
import { AppState } from '../store/store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AlertDialogExample from '../alerts/AlertDialog'
import { getCookie } from '@/utils/cookies'
import { useRouter } from 'next/router'

const Navbar = () => {
    const uEmail = useSelector<AppState>(state => state.user.user.email) as string
    const [isOpen, onClose] = useState<boolean>(false)
    const [auth, setAuth] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        getCookie() ? setAuth(true) : setAuth(false)
    }, [])

    return (
        <>
            <header className='p-4 w-full bg-white'>
                <nav>
                    {
                        auth ? (
                            <ul className='flex justify-end items-center'>
                                
                                <li className='font-semibold mx-3 text-md underline text-slate-700'>{uEmail}</li>
                                <li className='font-bolder mx-3 text-lg cursor-pointer'>
                                    <Image src="/images/logout.png" alt="" width={100} height={100} className='w-6' onClick={() => onClose(true)} />
                                </li>
                            </ul>
                        ) : (
                            <ul className='flex justify-end items-center mx-4'>
                                <li className='font-semibold text-lg px-4 py-1 cursor-pointer rounded-sm bg-[#5a51be] text-stone-100 bg' onClick={() => router.push('/')}>Login</li>
                            </ul>
                        )
                    }
                </nav>
            </header>
            {<AlertDialogExample _id='' isOpen={isOpen} onClose={onClose} filter='logout' />}
        </>
    )
}

export default Navbar