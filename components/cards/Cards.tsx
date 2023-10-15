import Card from './Card'

const Cards = () => {
  return (
      <div className='grid grid-cols-3 w-full gap-4 my-2 p-4'>
        <Card color='bg-[#519fbe]' title='Total Clients' />
        <Card color='bg-[#a851be]' title='Total Projects' />
        <Card color='bg-[#be9851]' title='Total Invoice' />
      </div>
  )
}

export default Cards