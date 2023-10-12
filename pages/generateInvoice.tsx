import TopHeader from '@/components/generate-invoice/TopHeader'
import BottomMain from '@/components/generate-invoice/bottom/BottomMain'
import MiddleMain from '@/components/generate-invoice/middle/MiddleMain'
import Layout from '@/components/layout/Layout'

const GenerateInvoice = () => {
  return (
    // <Layout>
      <div className='bg-[#fff] p-4'>
        <TopHeader />
        <MiddleMain />
        <BottomMain />
      </div>
    // </Layout>
  )
}

export default GenerateInvoice