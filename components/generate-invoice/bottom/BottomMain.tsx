import React from 'react'
import Table from './Table'
import Account from './Account'
import Total from './Total'

const BottomMain = () => {
    return (
        <>
            <Table />
            <div className='flex justify-between'>
                <Account />
                <Total />
            </div>
        </>
    )
}

export default BottomMain