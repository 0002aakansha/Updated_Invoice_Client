import CheckedModal from '@/components/modals/checkedModal'
import { InvoiceContext } from '@/state-management/context/context'
import React, { useContext, useEffect } from 'react'

interface Props {
    project: {
        _id: string,
        description: string,
        rate: {
            currency: string,
            rate: string
        },
        projectAmount: number,
        conversionRate: number
    },
    indx: number
}

const TableTr = ({ project, indx }: Props) => {
    const { invoiceType, projectDataType, setDataOnChecked } = useContext(InvoiceContext)

    return (
        <>
            <td>{project?.description}</td>
            {invoiceType === 'monthly' ? (
                <>
                    <td>{projectDataType[indx]?.period}</td>
                    <td>{projectDataType[indx]?.workingDays}</td>
                    <td>{projectDataType[indx]?.totalWorkingDays}</td>
                </>
            ) : (
                <>
                    <td>{project?.rate?.rate} $/Hour</td>
                    <td>{projectDataType[indx]?.hours}</td>
                    <td>1$ = {project?.conversionRate}</td>
                </>
            )}
            <td>INR {projectDataType[indx]?.amount}</td>
        </>
    )
}

export default TableTr