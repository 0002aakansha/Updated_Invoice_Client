import React from 'react'

const InvoiceNumber = () => {
    return (
        <div>
            <div className='text-stone-100 bg-purple-700 my-2 p-1 rounded-sm'>
                <label htmlFor="invoice">Invoice Number</label>
                <input type="text" id='invoice' className='bg-transparent outline-none border-b border-stone-300' />
            </div>
            <div className='my-2 p-1 rounded-sm'>
                <label htmlFor="date">Invoice Number</label>
                <input type="date" id='date' className='bg-transparent outline-none border-b border-stone-300' />
            </div>
            <div className='my-2 p-1 rounded-sm'>
                <label htmlFor="duedate">Invoice Number</label>
                <input type="date" id='duedate' className='bg-transparent outline-none border-b border-stone-300' />
            </div>
        </div>
    )
}

export default InvoiceNumber