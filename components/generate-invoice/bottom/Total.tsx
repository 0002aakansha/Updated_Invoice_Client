import { InvoiceContext } from '@/state-management/context/context'
import React, { useContext } from 'react'

const Total = () => {
    const { subtotal } = useContext(InvoiceContext)

    return (
        <div className=''>
            <div className='flex justify-between font-semibold'>
                <h1>SUBTOTAL</h1>
                <h5>{subtotal}</h5>
            </div>
            <div className='flex justify-between font-semibold'>
                <h1>CGST@ 9%</h1>
                <h5>0,0.0</h5>
            </div>
            <div className='flex justify-between font-semibold'>
                <h1>SGST@ 9%</h1>
                <h5>0,0.0</h5>
            </div>
            <div className='flex text-stone-100'>
                <h1 className='bg-[#5a51be] me-1 px-4 py-1 font-semibold rounded-sm'>TOTAL</h1>
                <h5 className='bg-[#5a51be] ms-1 px-4 py-1 font-semibold rounded-sm'>00,000.00</h5>
            </div>
        </div>
    )
}

export default Total