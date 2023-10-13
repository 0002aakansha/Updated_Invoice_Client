import React, { useContext } from 'react'
import Table from './Table'
import Account from './Account'
import Total from './Total'
import { ProjectContext } from '@/state-management/context/project'

const BottomMain = () => {
    const { projects } = useContext(ProjectContext)

    return (
        <>
            {
                projects?.length !== 0 ? (
                    <>
                        <Table />
                        <div className='flex justify-between my-[2rem]'>
                            <Account />
                            <Total />
                        </div>
                        <p className='font-semibold text-sm text-center my-4'>We appreciate your collaboration and look forword to a long relationship with you.</p>
                    </>
                ) : <h1>No projects</h1>
            }
        </>
    )
}

export default BottomMain