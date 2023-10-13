import fetchUser from '@/axios/api/fetchUser'
import TopHeader from '@/components/generate-invoice/TopHeader'
import BottomMain from '@/components/generate-invoice/bottom/BottomMain'
import MiddleMain from '@/components/generate-invoice/middle/MiddleMain'
import Layout from '@/components/layout/Layout'
import { UserContext } from '@/state-management/context/user'
import { useContext, useEffect, useState } from 'react'

const GenerateInvoice = () => {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  return (
    <Layout>
      <div className='bg-[#fff] p-8'>
        <TopHeader />
        <MiddleMain />
        <BottomMain />
      </div>
    </Layout>
  )
}

export default GenerateInvoice