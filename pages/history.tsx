import Layout from "@/components/layout/Layout"
import { getAllInvoice } from "@/components/store/invoiceHistory"
import { AppDispatch, AppState } from "@/components/store/store"
import HistoryCard from "@/components/tables/historyCard"
import { invoiceHistoryType } from "@/types/types"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const History = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, invoice } = useSelector<AppState>(state => state.history) as invoiceHistoryType

    useEffect(() => {
        dispatch(getAllInvoice())
    }, [])

    useEffect(() => {
        if (error.message !== '') toast.error(error.message)
    }, [error.message])

    return (
        <Layout>
            <div className="grid grid-cols-3">
                {
                    invoice.map(invoice => <HistoryCard key={invoice._id} invoice={invoice} />)
                }
            </div>
        </Layout>
    )
}

export default History