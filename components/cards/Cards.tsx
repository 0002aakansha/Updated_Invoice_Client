import Card from './Card'
import { AppState } from '../store/store'
import { useSelector } from 'react-redux'
import { clientStateType, projectStateType } from '@/types/types'

const Cards = () => {
  const client = useSelector<AppState>(state => state.client) as clientStateType
  const projects = useSelector<AppState>(state => state.project) as projectStateType

  return (
    <div className='grid grid-cols-3 w-full gap-4 my-2 p-4'>
      <Card color='bg-[#519fbe]' title='Total Clients' total={client?.clients?.length} isLoading={client?.isLoading} />
      <Card color='bg-[#a851be]' title='Total Projects' total={projects?.projects?.length} isLoading={client?.isLoading} />
      <Card color='bg-[#be9851]' title='Total Invoice' total={0} isLoading={false} />
    </div>
  )
}

export default Cards