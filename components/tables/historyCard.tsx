import { invoiceType } from '@/types/types'
import { FaRotateRight } from 'react-icons/fa6'
import { RiEdit2Line } from 'react-icons/ri'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillExclamationCircleFill } from 'react-icons/bs'

const HistoryCard = ({ invoice }: { invoice: invoiceType }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center cursor-default shadow-md rounded-sm mx-1 my-4 bg-white hover:bg-stone-100 transition ease-in-out duration-500 px-4 py-8'>
                <div className='flex justify-around w-full items-center'>
                    <BsFillExclamationCircleFill className='text-red-500 w-[70px] h-[70px] flex items-center justify-center p-1' />
                    <div>
                        <h1 className='font-semibold'>Invoice: {invoice.invoiceNumber}</h1>
                        <p>Createdon: {invoice.createdOn}</p>
                        <p>Due Date: {invoice.dueDate}</p>
                    </div>
                </div>
                <div className='w-full p-4'>
                    <div className='flex justify-center'>
                        <p className='text-lg font-semibold capitalize'>{invoice.createdFor}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <h1> </h1>

                        </div>
                        <div className='flex'>
                            <h1></h1>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1 className='font-semibold'>Status: </h1>
                        <p className=''>{invoice.status}</p>
                    </div>
                </div>
                <div className='w-full border-t-2 border-slate-400 flex pt-4 justify-around'>
                    <div>
                        <FaRotateRight className=' text-blue-950 text-2xl' />
                    </div>
                    <div>
                        <RiEdit2Line className=' text-blue-950 text-2xl' />
                    </div>
                    <div>
                        <AiFillDelete className=' text-blue-950 text-2xl' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryCard
