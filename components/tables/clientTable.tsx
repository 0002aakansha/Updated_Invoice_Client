import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { clientStateType, clientType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../alerts/notFound";
import { useMemo, useState } from "react";
import AlertDialogExample from "../alerts/AlertDialog";
import UpdateClientModal from "../modals/updateClientModal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useRowData from "../hooks/useRowData";

const ClientTable = () => {
  const clients = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const { clientRow } = useRowData();

  const [_id, setId] = useState<string | any>(clients?.clients[0]?._id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const pagination = true;
  const paginationPageSize = 8;

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1
    }),
    []
  );

  const tableColumn = [
    {
      headerName: "S. No.",
      field: "sno",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      width: 100
    },
    {
      headerName: "Client",
      field: "client",
      resizable: true,
      headerClass: "custom-header",
      filter: true
    },
    {
      headerName: "GSTIN",
      field: "gstin",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
    },
    {
      headerName: "Address",
      field: "address",
      resizable: true,
      width: 500,
      headerClass: "custom-header",
      cellClass: "centered-cell",
    },
    {
      headerName: "Projects",
      field: "projects",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass: "custom-header",
      cellRenderer: (params: any) => (
        <div className="md:p-2 sm:pr-0 sm:pl-0 text-center cursor-pointer space-x-10">
          <FontAwesomeIcon
            icon={faUserPen}
            style={{ color: "#5d6f99" }}
            className=" sm:text-xs md:text-lg"
            onClick={() => {
              setUpdateOpen(true);
              setId(params?.data?._id);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "rgb(247 43 43)" }}
            className="sm:text-xs  md:text-lg"
            onClick={() => {
              setDeleteOpen(true);
              setId(params?.data?._id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {!clientRow?.length ? (
        <NotFound title="Not Found" description="Please Add Client First!" />
      ) : (
        <>
          <div className="ag-theme-alpine" style={{ width: "100%" }}>
            <AgGridReact
              defaultColDef={defaultColDef}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              columnDefs={tableColumn} // header
              rowData={clientRow} // cells
              animateRows={true}
              domLayout="autoHeight"
            />
          </div>
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
      )}
    </>
  );
};

export default ClientTable;
