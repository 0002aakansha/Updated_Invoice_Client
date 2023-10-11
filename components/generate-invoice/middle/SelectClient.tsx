import { InvoiceContext } from '@/state-management/context/context'
import { useState, useContext } from 'react'

const SelectClient = () => {
    const [invoiceType, setInvoiceType] = useState('monthly')

    const invoiceCTX = useContext(InvoiceContext)

    return (
        <div className='flex'>
            <div>
                <form action="">
                    <label htmlFor='select'>Bill To:</label>
                    <select id='select'>
                        <option value="">
                            Techracers private limited
                        </option>
                    </select>
                </form>
            </div>
            <div>
                <form action="">
                    <label htmlFor='select'>Bill To:</label>
                    <select id='select' onChange={(e) => invoiceCTX.setInvoiceType(e.target.value)}>
                        <option value="monthly">
                            Monthly
                        </option>
                        <option value="hourly">
                            Hourly
                        </option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default SelectClient