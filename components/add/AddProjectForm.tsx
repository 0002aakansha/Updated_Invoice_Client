import React from 'react'

const AddProjectForm = () => {
    return (
        <div className='w-full'>
            <form action="" className='bg-white p-4 rounded-sm mx-auto w-1/2'>
                <h1 className='mt-2 mb-4 uppercase border-b p-3 text-center font-bold text-[#5a51be] text-xl tracking-wide'>Add Project</h1>
                <div className='p-4'>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Description</label>
                        <input type="text" placeholder='Description' className='outline-none border-2 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Project Amount</label>
                        <input type="number" step='0.01' placeholder='Project Amount' className='outline-none border-2 px-4 py-2 rounded-md' />
                    </div>
                    <div className='grid grid-cols-2 space-x-2 my-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Currency</label>
                            <select name="" id="" className='outline-none border-2 px-4 py-2 rounded-md'>
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="POUND">POUND</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Rate</label>
                            <input type="number" step='0.01' placeholder='Rate' className='outline-none border-2 px-4 py-2 rounded-md' />
                        </div>
                    </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="name" className='font-semibold tracking-wide mb-2'>Conversion Rate</label>
                        <input type="number" step='0.01' placeholder='Conversion Rate' className='outline-none border-2 px-4 py-2 rounded-md' />
                    </div>
                </div>
                <div className='flex justify-center my-3'>
                    <button className='bg-[#5a51be] text-stone-100 px-4 py-2 w-1/2 rounded-sm font-semibold text-lg'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProjectForm