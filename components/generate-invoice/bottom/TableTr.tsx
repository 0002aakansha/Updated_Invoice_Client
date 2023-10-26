import { AppState } from '@/components/store/store'
import { invoiceStateType, projectType } from '@/types/types'
import { useSelector } from 'react-redux'

interface Props {
    project: projectType,
    indx: number
}



const TableTr = ({ project, indx }: Props) => {
    const { invoiceType, detailedProject } = useSelector<AppState>(state => state.invoice) as invoiceStateType

    
    return (
        <>
            <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{indx + 1}</td>
            <td className='border-2 border-[#9d96e4] px-4 py-1'>{project?.description}</td>
            {invoiceType === 'monthly' ? (
                <>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{detailedProject[indx]?.period !== '' ? detailedProject[indx]?.period : <span className='text-slate-400 select-none'>Miscellaneous</span>}</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{detailedProject[indx]?.workingDays}</td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{detailedProject[indx]?.totalWorkingDays}</td>
                </>
            ) : (
                <>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>
                        {/* {project?.rate?.rate} {project?.rate?.currency}/Hour */}
                        {`${project?.rate?.rate} ${project?.rate?.currency === 'USD' ? '$' : project?.rate?.currency === 'POUND' ? '£' : project?.rate?.currency === 'INR' ? 'INR' : ''} / Hour`}
                    </td>
                    <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>{detailedProject[indx]?.hours}</td>
                   
                     <td className='border-2 border-[#9d96e4] px-4 py-1 text-center'>
                     
                     {
                        project?.rate?.currency === 'USD' ? `1$ = ${project?.conversionRate}` :
                        project?.rate?.currency === 'POUND' ? `1£ = ${project?.conversionRate} POUND` :
                        project?.rate?.currency === 'INR'? (
                                <span className="text-red-500 font-semibold">N/A</span>
                         ) : ''
                        
                     }
                     </td>
                </>
            )}
            <td className='border-2 border-[#9d96e4] px-4 py-1 text-center font-semibold'>INR {detailedProject[indx]?.amount}</td>
        </>
    )
}

export default TableTr