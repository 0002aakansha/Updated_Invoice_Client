import NotFound from "@/components/alerts/notFound"
import Layout from "@/components/layout/Layout"
import FullPageLoader from "@/components/spinners/fullPageLoader"
import { getAllInvoice } from "@/components/store/invoiceHistory"
import { AppDispatch, AppState } from "@/components/store/store"
import HistoryCard from "@/components/tables/historyCard"
import { invoiceHistoryType } from "@/types/types"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const History = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, invoice, isLoading } = useSelector<AppState>(state => state.history) as invoiceHistoryType

    useEffect(() => {
        dispatch(getAllInvoice())
    }, [])

    useEffect(() => {
        if (error.message !== '') toast.error(error.message)
    }, [error.message])

    return (
        <Layout>
            {
                isLoading ? <FullPageLoader /> : invoice.length === 0 ? <NotFound title="Empty!" description='' /> : (
                    <div className="">
                        <table className="table-auto w-full border-separate border-spacing-y-4">
                            <thead className="bg-[#5a51be]">
                                <tr>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">invoice</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">client</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">created on</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">due date</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">amount</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium">status</th>
                                    <th className="text-stone-100 capitalize text-md p-4 tracking-wider font font-medium w-[13%]">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.map(invoice => <HistoryCard key={invoice._id} invoiceData={invoice} />)}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </Layout >
    )
}

export default History