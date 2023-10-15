import { BsFillBarChartFill } from 'react-icons/bs'

const Card = ({ color, title }: { color: string, title: string }) => {
    return (
        <div className={`bg-[${color}] px-8 py-4 h-28 rounded-sm flex justify-between items-center`}>
            <div>
                <h1 className='text-xl font-semibold text-slate-50'>{title}</h1>
                <p className='text-3xl font-semibold text-slate-50'>453</p>
            </div>
            <div>
                <BsFillBarChartFill className='text-slate-50 text-5xl text-right' />
            </div>
        </div>
    )
}

export default Card