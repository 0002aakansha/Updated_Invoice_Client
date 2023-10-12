import { InvoiceContext } from '@/state-management/context/context'
import { useContext, useEffect, useState } from 'react'
import TableTr from './TableTr'
import { data } from '@/utils/data'
import CheckedModal from '@/components/modals/checkedModal'

const Table = () => {
    const { invoiceType, setisChecked, isChecked, projectDataType, setterOfProjectDataType, calculateSubtotal } = useContext(InvoiceContext)
    const [projectData, setProjectDataType] = useState(data.allListedProjects[0].projects)
    const [uniqueKey, setUniqueKey] = useState<number>(0)

    useEffect(() => {
        const projects = projectData.map((project) => {
            return { _id: project._id, period: '0', description: project.description, workingDays: '0', totalWorkingDays: '0', hours: '0.0', projectAmount: project.projectAmount, amount: '0,0.0', rate: project.rate, conversionRate: project.conversionRate, checked: false }
        })

        setterOfProjectDataType(projects)
    }, [projectData])

    return (
        <>
            <div>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            <th></th>
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
                            projectData.map((project, indx) => {
                                return (
                                    <>
                                        <tr key={project?._id}>
                                            <td>
                                                <input type="checkbox" onChange={(e) => {
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
        </>
    )
}

export default Table