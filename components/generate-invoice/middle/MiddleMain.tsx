import React from 'react'
import InvoiceNumber from './InvoiceNumber'
import SelectClient from './SelectClient'

const MiddleMain = () => {
  return (
    <div className='xs:grid xs:grid-cols-1  md:grid  md:grid-cols-2 my-[2rem]'>
        <InvoiceNumber />
        <SelectClient />
    </div>
  )
}

export default MiddleMain