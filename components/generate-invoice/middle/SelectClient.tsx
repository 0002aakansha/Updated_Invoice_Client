import fetchClient from '@/axios/api/fetchClients'
import { InvoiceContext } from '@/state-management/context/context'
import { ProjectContext } from '@/state-management/context/project'
import { UserContext } from '@/state-management/context/user'
import { clientType } from '@/types/types'
import { ChangeEvent, useContext, useEffect, useState } from 'react'

const SelectClient = () => {

    const [clients, setClients] = useState<clientType[]>()
    const [clientId, setClientId] = useState<string | undefined>(clients && clients[0]._id)
    const { invoiceType, setInvoiceType } = useContext(InvoiceContext)
    const { isLoading } = useContext(UserContext)
    const { fetchProjects, setHidden, projects } = useContext(ProjectContext)

    async function onLoadClient() {
        setClients(await fetchClient())
    }

    function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
        setClientId(e.target.value)
    }

    useEffect(() => {
        onLoadClient()
    }, [])

    useEffect(() => {
        console.log(clientId);

        if (clientId === 'undefined' || clientId === undefined) {
            setHidden(true)
        }
        else {
            fetchProjects(clientId)
            setHidden(false)
        }
    }, [clientId])

    return (
        <div className='flex justify-around'>
            <div>
                <form action="" className='flex flex-col'>
                    <label htmlFor='select' className='font-semibold'>Bill To:</label>
                    <select id='select'
                        className='outline-none bg-transparent'
                        value={clientId}
                        onChange={changeHandler}
                    >
                        {
                            clients ? (
                                <>
                                    <option value={'undefined'}>Select Client</option>
                                    {
                                        clients?.map(client => <option
                                            key={client._id}
                                            value={client._id}
                                        >
                                            {client.name}
                                        </option>)
                                    }
                                </>
                            ) : <option value="">There are no clients</option>
                        }
                    </select>
                </form>
            </div>
            <div>
                {
                    projects?.length !== 0 && (
                        <form action="" className='flex flex-col'>
                            <label htmlFor='select' className='font-semibold'>Invoice Type:</label>
                            <select id='select'
                                onChange={(e) => setInvoiceType(e.target.value)}
                                className='outline-none bg-transparent'
                            >
                                <option value="monthly">
                                    Monthly
                                </option>
                                <option value="hourly">
                                    Hourly
                                </option>
                            </select>
                        </form>
                    )
                }
            </div>
        </div >
    )
}

export default SelectClient