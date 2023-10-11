import React from 'react'
import InvoiceNumber from './InvoiceNumber'
import SelectClient from './SelectClient'

const MiddleMain = () => {
  return (
    <div className='flex justify-between'>
        <InvoiceNumber />
        <SelectClient />
    </div>
  )
}

export default MiddleMain