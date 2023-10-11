import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface Props {
    children: JSX.Element | JSX.Element[] | string
}

const Layout = ({ children }: Props) => {
    return (
        <div className='grid grid-cols-[20%_80%]'>
            <Sidebar />
            <div className='bg-[#f2f2f2]'>
                <Navbar />
                <div className='p-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout