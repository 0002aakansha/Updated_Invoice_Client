import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store/store'
import { useEffect, useState } from 'react'
import { AppDispatch } from '@/components/store/store'
import { fetchUserById } from '@/components/store/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faAngleRight, faBars, faFileInvoice, faHouse, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FaHistory } from 'react-icons/fa'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Loader from '../spinners/Loader'

const SideBar = () => {
    const router = useRouter()
    const uname = useSelector<AppState>(state => state.user.user?.name) as string
    const loading = useSelector<AppState>(state => state.user.isLoading) as boolean
    const dispatch = useDispatch<AppDispatch>()
    const { collapseSidebar } = useProSidebar();

    useEffect(() => {
        const userId = localStorage.getItem('user') as string
        dispatch(fetchUserById(userId))
    }, [])

    return (
        <>
            <Sidebar style={{ height: "100vh" }} defaultCollapsed={true} className='md:static sm:fixed'>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                        className='my-4'
                    >
                        <div className='p-4'>
                            {loading ? <Loader /> : uname.toLowerCase().startsWith('gammaedge') ? <img src="/images/logo.png" alt="" className="w-full" /> : <img src="/images/cubexoLogo.png" alt="" className="w-3/4" />
                            }
                        </div>
                    </MenuItem>
                    <MenuItem className='mt-4 mb-2'
                        icon={<FontAwesomeIcon icon={faHouse} className='text-stone-900 text-lg' />}
                        onClick={() => router.push('/dashboard')}>
                        <span className='capitalize tracking-normal font-semibold text-slate-700'>Dashboard</span>
                    </MenuItem>
                    <MenuItem className='my-2'
                        icon={<FontAwesomeIcon icon={faUserPlus} className='text-stone-900 text-lg' />}
                        onClick={() => router.push('/addClient')}>
                        <span className='capitalize tracking-normal font-semibold text-slate-700'>Add Client</span>
                    </MenuItem>
                    <MenuItem className='my-2'
                        icon={<FontAwesomeIcon icon={faAddressBook} className='text-stone-900 text-lg' />}
                        onClick={() => router.push('/addProject')}>
                        <span className='capitalize tracking-normal font-semibold text-slate-700'>Add Project</span>
                    </MenuItem>
                    <MenuItem className='my-2'
                        icon={<ReceiptOutlinedIcon className='text-xl' />}
                        onClick={() => router.push('/generateInvoice')}>
                        <span className='capitalize tracking-normal font-semibold text-slate-700'>Generate Invoice</span>
                    </MenuItem>
                    <MenuItem className='my-2'
                        icon={<FaHistory className='text-lg' />}
                        onClick={() => router.push('/history')}>
                        <span className='capitalize tracking-normal font-semibold text-slate-700'>Invoice History</span>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </>
    )
}

export default SideBar