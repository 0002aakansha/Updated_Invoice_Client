import { useSelector } from 'react-redux'
import { AppState } from '../store/store'
import Image from 'next/image'
import ButtonLoading from '../spinners/buttonLoading'
import { useState } from 'react'
import AlertDialogExample from '../alerts/AlertDialog'

const Navbar = () => {
    const uEmail = useSelector<AppState>(state => state.user.user.email) as string
    const loading = useSelector<AppState>(state => state.user.isLoading) as string
    const [isOpen, onClose] = useState<boolean>(false)

    return (
        <>
            <header className='p-4 w-full bg-white'>
                <nav>
                    <ul className='flex justify-end items-center'>
                        <li className='font-semibold mx-3 text-md underline text-slate-700'>{loading ? <ButtonLoading /> : uEmail}</li>
                        <li className='font-bolder mx-3 text-lg cursor-pointer'>
                            <Image src="/images/logout.png" alt="" width={100} height={100} className='w-6' onClick={() => onClose(true)} />
                        </li>
                    </ul>
                </nav>
            </header>
            {<AlertDialogExample isOpen={isOpen} onClose={onClose} filter='logout' />}
        </>
    )
}

export default Navbar