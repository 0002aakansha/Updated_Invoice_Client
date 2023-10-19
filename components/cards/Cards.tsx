import Card from './Card'
import { AppState } from '../store/store'
import { useSelector } from 'react-redux'
import { clientStateType, invoiceHistoryType, projectStateType } from '@/types/types'

const Cards = () => {
  const client = useSelector<AppState>(state => state.client) as clientStateType
  const projects = useSelector<AppState>(state => state.project) as projectStateType
  const { invoice } = useSelector<AppState>(state => state.history) as invoiceHistoryType

  return (
    <div className='grid md:grid-cols-3 xs:grid-cols-1 w-full gap-4 my-2 p-4'>
      <Card color='bg-[#519fbe]' title='Total Clients' total={client?.clients?.length} isLoading={client?.isLoading} />
      <Card color='bg-[#a851be]' title='Total Projects' total={projects?.projects?.length} isLoading={client?.isLoading} />
      <Card color='bg-[#be9851]' title='Total Invoice' total={invoice.length} isLoading={false} />
    </div>
  )
}

export default Cards