import React from 'react'

const Navbar = () => {
    return (
        <header className='p-4 w-full bg-purple-800'>
            <nav>
                <ul className='flex justify-end'>
                    <li className='text-stone-100 font-semibold mx-3 text-lg'>accounts@gammaedge.io</li>
                    <li className='text-stone-100 font-semibold mx-3 text-lg'>logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar