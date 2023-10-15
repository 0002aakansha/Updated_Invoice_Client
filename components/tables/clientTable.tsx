import { useSelector } from "react-redux"
import { AppState } from "../store/store"
import { clientStateType } from "@/types/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons"
import NotFound from "../alerts/notFound"
import { useState } from "react"
import AlertDialogExample from "../alerts/AlertDialog"
import UpdateClientModal from "../modals/updateClientModal"

const ClientTable = () => {
    const clients = useSelector<AppState>(state => state.client) as clientStateType
    const [updateOpen, setUpdateOpen] = useState<boolean>(false)
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

    return (
        <>
            {
                clients?.clients?.length !== 0 ? (
                    <div className='bg-stone-50 shadow-sm my-4 mx-auto'>
                        <table className="table-fixed w-full shadow-md overflow-hidden rounded-t-lg">
                            <thead>
                                <tr className="bg-[#5a51be] text-stone-50">
                                    <th className="p-2 font-semibold uppercase">S. No.</th>
                                    <th className="p-2 text-start font-semibold uppercase">Client</th>
                                    <th className="p-2 text-center font-semibold uppercase">GSTIN</th>
                                    <th className="p-2 text-center font-semibold uppercase">address</th>
                                    <th className="p-2 text-center font-semibold uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clients?.clients?.map((client, i) => (
                                        <tr key={client._id} className="w-full border-b even:bg-slate-100">
                                            <td className="text-center py-3 font-semibold">{i + 1}.</td>
                                            <td className="py-3 text-start font-semibold text-slate-700 capitalize">{client.name}</td>
                                            <td className="py-3 text-center text-slate-600 text-sm">{client.gstin}</td>
                                            <td className="py-3 text-center text-slate-600 text-sm">{`${client.address.street}, ${client.address.city}, ${client.address.pin} ${client.address.state}, ${client.address.country}`}</td>
                                            <td className="py-3 text-center cursor-pointer space-x-10">
                                                <FontAwesomeIcon icon={faUserPen} style={{ color: "#5d6f99" }} className="text-lg" onClick={() => setUpdateOpen(true)} />
                                                <FontAwesomeIcon icon={faTrash} style={{ color: "#ed0707" }} className="text-lg" onClick={() => setDeleteOpen(true)} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : <NotFound title='Not Found' description='Please Add Client First!' />
            }
            <UpdateClientModal isOpen={updateOpen} onClose={setUpdateOpen} />
            <AlertDialogExample isOpen={deleteOpen} onClose={setDeleteOpen} filter="clientDelete" />
        </>
    )
}

export default ClientTable