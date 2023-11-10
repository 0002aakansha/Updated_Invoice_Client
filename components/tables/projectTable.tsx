import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { projectStateType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../alerts/notFound";
import { useMemo, useState } from "react";
import UpdateProjectModal from "../modals/updateProjectModal";
import AlertDialogExample from "../alerts/AlertDialog";
import FullPageLoader from "../spinners/fullPageLoader";
import { AgGridReact } from "ag-grid-react";
import { useProjectRowData } from "../hooks/useRowData";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ProjectTable = () => {
  const [_id, setId] = useState("");
  const [cid, setcid] = useState("");

  const projects = useSelector<AppState>(
    (state) => state.project
  ) as projectStateType;
  const { projectRow } = useProjectRowData();
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const tableColumn:any = [
    {
      headerName: "S. No.",
      field: "sno",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      width: 80,
      pinned: 'left',
      lockPinned: true,
    },
    {
      headerName: "Description",
      field: "description",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      pinned: 'left',
      lockPinned: true,
    },
    {
      headerName: "Client",
      field: "client",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Project type",
      field: "projectType",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Project amount",
      field: "projectAmount",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Project Cycle",
      field: "projectCycle",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Rate",
      field: "rate",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Conversion rate",
      field: "conversionRate",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass: "custom-header",
      cellClass: "centered-cell",
      pinned: 'right',
      lockPinned: true,
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

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );
  const pagination = true;
  const paginationPageSize = 8;

  return (
    <>
      {projects.isLoading && <FullPageLoader />}
      {!projects.isLoading && !projects?.projects?.length ? (
        <NotFound
          title="Not Found"
          description="There are 0 projects. Please create project first!"
        />
      ) : (
        <div className="ag-theme-alpine" style={{ width: "100%" }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          columnDefs={tableColumn} // header
          rowData={projectRow} // cells
          animateRows={true}
          domLayout="autoHeight"
        />
      </div>
      )}
      <UpdateProjectModal
        isOpen={updateOpen}
        onClose={setUpdateOpen}
        _id={_id}
      />
      <AlertDialogExample
        isOpen={deleteOpen}
        onClose={setDeleteOpen}
        filter="projectDelete"
        _id={_id}
        cid={cid}
      />
    </>
  );
};

export default ProjectTable;
