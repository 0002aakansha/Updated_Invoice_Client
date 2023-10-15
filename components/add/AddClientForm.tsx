const AddClientForm = () => {
  return (
    <div className='w-full'>
      <form action="" className='bg-white p-4 rounded-sm mx-auto w-1/2'>
        <h1 className='mt-2 uppercase mb-6 border-b p-3 text-center font-bold text-[#5a51be] text-xl tracking-wide'>Add Client</h1>
        <div className='grid grid-cols-2 px-4 space-x-2'>
          <div className='flex flex-col'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Client</label>
            <input type="text" placeholder='Name' autoFocus className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>GSTIN</label>
            <input type="text" placeholder='GSTIN' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
        </div>
        <h2 className='font-bold tracking-wide my-4 px-4'>Address: </h2>
        <div className='grid grid-cols-2 my-4 px-4'>
          <div className='flex flex-col m-1'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Street</label>
            <input type="text" placeholder='Street' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col m-1'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>City</label>
            <input type="text" placeholder='City' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col m-1'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>PIN</label>
            <input type="text" placeholder='Pin' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col m-1'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>State</label>
            <input type="text" placeholder='State' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
          <div className='flex flex-col m-1'>
            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Country</label>
            <input type="text" placeholder='Country' className='outline-none border-2 px-4 py-2 rounded-md' />
          </div>
        </div>
        <div className='flex justify-center my-3'>
          <button className='bg-[#5a51be] text-stone-100 px-4 py-2 w-1/2 rounded-sm font-semibold text-lg'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddClientForm