import Layout from '@/components/layout/Layout'
import NotFound from '@/components/alerts/notFound'
import FullPageLoader from '@/components/spinners/fullPageLoader'
import { fetchClient } from '@/components/store/client'
import { AppDispatch, AppState } from '@/components/store/store'
import { clientStateType } from '@/types/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '@/components/cards/Cards'
import MainTable from '@/components/tables/MainTable'


const Dashboard = () => {
    const { isLoading, error } = useSelector<AppState>(state => state.client) as clientStateType
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    useEffect(() => {
        (async function () {
            await dispatch(fetchClient())
        })()
    }, [])

    useEffect(() => {
        if (error?.status == 401) {
            toast.error('Please Login First!', {
                id: 'auth'
            })
            router.push('/')
        }

        return () => toast.dismiss();
    }, [error?.status])

    if (error)

        return (
            <Layout>
                {isLoading ? <FullPageLoader /> : (
                    <>
                        <Cards />
                        <MainTable />
                    </>
                )}
            </Layout>
        )
}

export default Dashboard