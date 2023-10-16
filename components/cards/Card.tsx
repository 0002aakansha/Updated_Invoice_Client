import { BiBarChartAlt } from 'react-icons/bi'
import ButtonLoading from '../spinners/buttonLoading'

const Card = ({ color, title, total, isLoading }: { color: string, title: string, total: number, isLoading: boolean }) => {
    return (
        <div className={`${color} px-4 py-4 shadow-md rounded-sm flex justify-between items-center`}>
            <div>
                <h1 className='text-xl font-semibold text-slate-50'>{title}</h1>
                {isLoading ? <ButtonLoading /> : <p className='text-[3rem] text-center font-semibold text-slate-50'>{total}</p>}
            </div>
            <div>
                <BiBarChartAlt className='text-slate-50 text-[5rem] text-right' />
            </div>
        </div>
    )
}

export default Card