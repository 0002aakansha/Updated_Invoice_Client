import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../store/project'
import { AppDispatch, AppState } from '../store/store'
import { fetchClient } from '../store/client'
import ClientTable from './clientTable'
import ProjectTable from './projectTable'

const MainTable = () => {

  const [select, setSelect] = useState('clients')
  const dispatch = useDispatch<AppDispatch>()

  const changeHandler = async (e: { target: { value: string } }) => {
    setSelect(e.target.value);
    (e.target.value === 'clients') ? await dispatch(fetchClient()) : await dispatch(fetchProjects())
  }

  return (
    <div className=" bg-white p-4 rounded-md">
      <div className='flex justify-between'>
        <h1 className='container text-xl text-[#5a51be] uppercase font-bold mt-4 mb-8 p-1'>{`${select === 'clients' ? 'All Clients' : 'All Projects'}`}</h1>

        <form action="" className='flex flex-row items-center space-x-4'>
          <select data-te-select-init
            className='bg-[#5a51be] text-stone-50 rounded-sm cursor-pointer outline-none shadow-lg px-4 py-2 font-semibold tracking-wider'
            onChange={changeHandler}
          >
            <option value="clients">View Clients</option>
            <option value="projects">View Projects</option>
          </select>
        </form>
      </div>
      {
        select === 'clients' ? <ClientTable /> : <ProjectTable />
      }
    </div>
  )
}

export default MainTable