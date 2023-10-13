import CheckedModal from '@/components/modals/checkedModal'
import { InvoiceContext } from '@/state-management/context/context'
import React, { useContext } from 'react'

interface Props {
    project: {
        _id: string,
        description: string,
        rate: {
            currency: string,
            rate: string | number
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
            <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{indx+1}</td>
            <td className='border-2 border-[#9d96e4] px-4 py-1'>{project?.description}</td>
            {invoiceType === 'monthly' ? (
                <>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{projectDataType[indx]?.period}</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{projectDataType[indx]?.workingDays}</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{projectDataType[indx]?.totalWorkingDays}</td>
                </>
            ) : (
                <>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{project?.rate?.rate} $/Hour</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{projectDataType[indx]?.hours}</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>1$ = {project?.conversionRate}</td>
                </>
            )}
            <td className='border-2 border-[#9d96e4] px-4 py-1 text-center font-semibold'>INR {projectDataType[indx]?.amount}</td>
        </>
    )
}

export default TableTr