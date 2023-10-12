import { InvoiceContext } from '@/state-management/context/context'
import React, { useContext } from 'react'

const Total = () => {
    const { subtotal } = useContext(InvoiceContext)

    return (
        <div>
            <div>
                <h1>SUBTOTAL</h1>
                <h5>{subtotal}</h5>
            </div>
            <div>
                <h1>CGST@ 9%</h1>
                <h5>0.0</h5>
            </div>
            <div>
                <h1>SGST@ 9%</h1>
                <h5>0.0</h5>
            </div>
            <div className='bg-purple-700 p-2'>
                <h1>TOTAL</h1>
                <h5>00,000.00</h5>
            </div>
        </div>
    )
}

export default Total