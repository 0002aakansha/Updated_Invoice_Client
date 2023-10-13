const InvoiceNumber = () => {
    return (
        <div>
            <div className='my-2 p-1 rounded-sm'>
                <label htmlFor="invoice" className="font-semibold">Invoice Number: </label>
                <input type="text" id='invoice' className='bg-transparent outline-none border px-2 border-stone-300' />
            </div>
            <div className='my-2 p-1 rounded-sm'>
                <label htmlFor="date" className="font-semibold">Date: </label>
                <input type="date" id='date' className='bg-transparent outline-none border px-2 border-stone-300' />
            </div>
            <div className='my-2 p-1 rounded-sm'>
                <label htmlFor="duedate" className="font-semibold">Due Date: </label>
                <input type="date" id='duedate' className='bg-transparent outline-none border px-2 border-stone-300' />
            </div>
        </div>
    )
}

export default InvoiceNumber