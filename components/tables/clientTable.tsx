import React from 'react'

const ClientTable = () => {
    return (
        <div>
            <h1 className='text-xl font-bold'>All Clients</h1>
            <div className='bg-stone-50 shadow-sm'>
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>GSTIN</th>
                            <th colSpan={2}>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tachracers private limited</td>
                            <td>GSAREJSHYXHJSA</td>
                            <td>update</td>
                            <td>delete</td>
                        </tr>
                        <tr>
                            <td>Tachracers private limited</td>
                            <td>GSAREJSHYXHJSA</td>
                            <td>update</td>
                            <td>delete</td>
                        </tr>
                        <tr>
                            <td>Tachracers private limited</td>
                            <td>GSAREJSHYXHJSA</td>
                            <td>update</td>
                            <td>delete</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

export default ClientTable