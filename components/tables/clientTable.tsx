import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import { clientStateType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../alerts/notFound";
import { useState } from "react";
import AlertDialogExample from "../alerts/AlertDialog";
import UpdateClientModal from "../modals/updateClientModal";

const ClientTable = () => {
  const clients = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;

  const [_id, setId] = useState<string>(clients?.clients[0]?._id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      {clients?.clients?.length !== 0 ? (
        <div className="bg-stone-50 shadow-sm my-4 mx-auto">
          <div className="overflow-x-auto">  
          {/* <table className="table-auto w-full shadow-md  md:overflow-hidden xs:overflow-x-scroll sm:overflow-x-scroll rounded-t-lg"> */}
          <table className="table-auto w-full shadow-md xs:table-fixed md:table-auto  rounded-t-lg">
            <thead>
              <tr className="bg-[#5a51be] text-stone-50">
                <th className="py-3 px-4 font-semibold uppercase  md:w-[10%] xs:text-xs  sm:text-xs md:text-base">S. No.</th>
                <th className="py-3 px-4 text-start font-semibold uppercase md:w-[30%] xs:text-xs  sm:text-xs md:text-base">
                  Client
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase md:w-[20%] xs:text-xs  sm:text-xs md:text-base">
                  GSTIN
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase  md:w-[30%] xs:text-xs  sm:text-xs md:text-base">
                  address
                </th>
                <th className="py-3 px-4 text-center font-semibold uppercase md:w-[10%] xs:text-xs  sm:text-xs md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clients?.clients?.map((client, i) => (
                <tr
                  key={client._id}
                  className="w-full border-b even:bg-[#afa7d63b]"
                >
                  <td className="text-center md:py-3 font-semibold xs:text-xs sm:text-xs md:text-base sm:pr-0 sm:pl-0">{i + 1}.</td>
                  <td className="md:py-3 md:px-4 text-start font-semibold xs:text-xs sm:text-xs md:text-base text-slate-700 capitalize sm:pr-0 sm:pl-0">
                    {client.name}
                  </td>
                  <td className="md:py-3 md:px-4 text-center text-slate-600 xs:text-xs sm:text-xs md:text-base sm:pr-0 sm:pl-0">
                    {client.gstin}
                  </td>
                  <td className="md:py-3 md:px-4 sm:pr-0 sm:pl-0 text-center text-slate-600 xs:text-xs sm:text-xs md:text-base">{`${client.address.street}, ${client.address.city}, ${client.address.pin} ${client.address.state}, ${client.address.country}`}</td>
                  <td className="md:p-2 sm:pr-0 sm:pl-0 text-center cursor-pointer space-x-10">
                    <FontAwesomeIcon
                      icon={faUserPen}
                      style={{ color: "#5d6f99" }}
                      className=" sm:text-xs md:text-lg"
                      onClick={() => {
                        setUpdateOpen(true);
                        setId(client._id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ed0707" }}
                      className="sm:text-xs  md:text-lg"
                      onClick={() => {
                        setDeleteOpen(true);
                        setId(client._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <NotFound title="Not Found" description="Please Add Client First!" />
      )}
      <UpdateClientModal
        isOpen={updateOpen}
        onClose={setUpdateOpen}
        _id={_id}
      />
      <AlertDialogExample
        isOpen={deleteOpen}
        onClose={setDeleteOpen}
        filter="clientDelete"
        _id={_id}
      />
    </>
  );
};

export default ClientTable;
