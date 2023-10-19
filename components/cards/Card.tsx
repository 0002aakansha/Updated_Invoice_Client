import { BiBarChartAlt } from 'react-icons/bi'
import ButtonLoading from '../spinners/buttonLoading'

const Card = ({ color, title, total, isLoading }: { color: string, title: string, total: number, isLoading: boolean }) => {
    return (
        <div className={`${color} card px-4 py-4 shadow-xl rounded-md flex  items-center md:flex-col md:w-[100%] sm:w-[50%] sm:mx-auto sm:justify-between`}>
            <h1 className='text-xl font-semibold tracking-wider text-slate-50'>{title}</h1>
            {isLoading ? <ButtonLoading /> : <p className='text-[3rem] text-center font-semibold text-slate-50'>{total}</p>}
        </div>
    )
}

export default Card