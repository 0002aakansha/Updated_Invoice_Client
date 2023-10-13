import { InvoiceContext } from '@/state-management/context/context'
import { useContext, useEffect, useState } from 'react'
import TableTr from './TableTr'
import CheckedModal from '@/components/modals/checkedModal'
import { ProjectContext } from '@/state-management/context/project'

const Table = () => {
    const { projects } = useContext(ProjectContext)
    const { invoiceType, setisChecked, isChecked, projectDataType, setterOfProjectDataType, calculateSubtotal } = useContext(InvoiceContext)

    const [uniqueKey, setUniqueKey] = useState<number>(0)

    useEffect(() => {
        const Projects = projects && projects.map((project) => {
            return { _id: project._id, period: '0', description: project.description, workingDays: '0', totalWorkingDays: '0', hours: '0.0', projectAmount: project.projectAmount, amount: '0,0.0', rate: project.rate, conversionRate: project.conversionRate, checked: false }
        })
        console.log(projects);

        if (Projects !== undefined) setterOfProjectDataType(Projects)
    }, [projects])

    return (
        <>
            {
                projects?.length !== 0 && (
                    <div>
                        <table className='table-auto w-full'>
                            <thead>
                                <tr className='bg-[#5a51be] text-stone-100'>
                                    <th></th>
                                    <th>S. No.</th>
                                    <th>Description</th>
                                    {invoiceType === 'monthly' ? (
                                        <>
                                            <th>Period</th>
                                            <th>Working Days</th>
                                            <th>Total Working Days</th>
                                        </>
                                    ) : (
                                        <>
                                            <th>Rate</th>
                                            <th>Hours</th>
                                            <th>Conversion Rate</th>
                                        </>
                                    )}
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects && projects?.map((project, indx) => {
                                        return (
                                            <>
                                                <tr key={project?._id} className='border border-[#9d96e4]'>
                                                    <td className='border border-[#9d96e4] text-center'>
                                                        <input type="checkbox" className='outline-none' onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setisChecked(true)
                                                                setUniqueKey(indx)
                                                                projectDataType[indx].checked = true
                                                            }
                                                            else {
                                                                setisChecked(false)
                                                                projectDataType[indx].checked = false
                                                            }
                                                            calculateSubtotal()
                                                        }} />
                                                    </td>
                                                    <TableTr key={project._id} indx={indx} project={project} />
                                                </tr>
                                                {isChecked && <CheckedModal key={project._id} indx={uniqueKey} />}
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}

export default Table