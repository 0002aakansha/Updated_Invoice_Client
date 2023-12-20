import {
  clientStateType,
  dataProps,
  invoiceProjectType,
  invoiceStateType,
  invoiceType,
  projectStateType,
  projectType,
} from "@/types/types";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Account from "../generate-invoice/bottom/Account";
import Total from "../generate-invoice/bottom/Total";
import EditTableColumn from "@/utils/editTableColumn";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import {
  calculateGST,
  setDetailedProject,
  setInvoiceType,
} from "../store/invoice";
import CheckedModal from "../modals/checkedModal";
import { fetchClientProjects } from "../store/client";
import { useCheckedProjectRowData } from "../hooks/useRowData";

const EditableTable = ({ invoice }: { invoice: invoiceType }) => {
  const tableColumn = EditTableColumn(invoice?.invoiceType);
  // const [projectRow, setProjectRow] = useState<dataProps[]>([]);
  const { uniqueKey } = useSelector<AppState>(
    (state) => state.project
  ) as projectStateType;
  const { projects } = useSelector<AppState>(
    (state) => state.client
  ) as clientStateType;
  const { isChecked, detailedProject } = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;
  const dispatch = useDispatch<AppDispatch>();
  const [filteredProjects, setFilteredProjects] = useState<projectType[]>([]);
  const [select, setSelect] = useState(filteredProjects[0]?._id);
  const { projectRow, setProjectRow } = useCheckedProjectRowData();

  const setInitialProject = (project: any, checked: boolean) => {
    return {
      _id: project._id,
      period: project.period ? project.period : "",
      description: project.description || project?.projectDetails?.description,
      projectType: project.projectType || project?.projectDetails?.projectType,
      workingDays: project?.projectDetails?.workingDays || project?.workingDays,
      totalWorkingDays:
        project?.projectDetails?.totalWorkingDays || project?.totalWorkingDays,
      hours: project?.projectDetails?.hours || project?.hours,
      projectAmount:
        project.projectAmount || project.projectDetails?.projectAmount,
      amount: +project?.amount || 0.0,
      rate: project.rate || project.projectDetails.rate,
      conversionRate: project.conversionRate ? project?.conversionRate : "N/A",
      projectBelongsTo:
        project.projectBelongsTo || project.projectDetails?.projectBelongsTo,
      checked: checked,
    };
  };

  const setTableRow = (project: any, indx: any) => {
    return {
      _id: project?._id,
      sno: indx + 1,
      description: project.description,
      period: project?.period || "Miscellaneous",
      workingDays: +project?.workingDays,
      totalWorkingDays: +project?.totalWorkingDays,
      hours: +project?.hours || 0.0,
      rate: `${
        project?.rate?.rate
          ? `${+project?.rate?.rate} ${project?.rate?.currency}`
          : "N/A"
      }`,
      conversionRate: project?.conversionRate ? project?.conversionRate : "N/A",
      projectAmount: project?.projectAmount ? +project?.projectAmount : "N/A",
      amount: +project?.amount || 0.0,
      projectBelongsTo: project?.projectBelongsTo,
    };
  };

  useEffect(() => {
    (() => dispatch(fetchClientProjects(invoice?.createdFor?._id)))();
    dispatch(setInvoiceType(invoice?.invoiceType));
    dispatch(
      calculateGST({
        userState: invoice.invoiceCreatedBy?.address?.state || "",
        clientState: invoice?.createdFor?.address?.state,
      })
    );
  }, [invoice?.createdFor?._id, invoice?.invoiceType]);

  useEffect(() => {
    const Projects = invoice.projects?.map((project: invoiceProjectType) =>
      setInitialProject(project, true)
    );

    if (Projects !== undefined) dispatch(setDetailedProject(Projects));
  }, [dispatch, invoice.projects]);

  useEffect(() => {
    setProjectRow(
      detailedProject?.map((project: any, indx: number) =>
        setTableRow(project, indx)
      )
    );
  }, [detailedProject, setProjectRow]);

  useEffect(() => {
    const invoiceProjectsId = new Set(
      invoice?.projects?.map((project: any) => project?.projectDetails?._id)
    );
    setFilteredProjects(
      projects.filter(
        (project: projectType) =>
          project.projectType === invoice?.invoiceType &&
          !invoiceProjectsId.has(project?._id) &&
          project?.active === true
      )
    );
  }, [invoice?.invoiceType, invoice?.projects, projects]);

  return (
    <>
      <div className="flex justify-start mx-4 space-x-2">
        <button className="bg-stone-200 text-stone-700 text-sm tracking-wider p-2 rounded-sm">
          + Add Project
        </button>
        <select
          className="outline-none"
          value={select}
          onChange={(e) => {
            if (e.target.value) {
              setSelect(() => e.target.value);
              const project = projects?.filter(
                (project) => project?._id === e.target.value
              )[0] as dataProps;
              const index = projectRow.findIndex(
                (row) => row?._id === project?._id
              );
              if (index === -1) {
                setProjectRow((projects: any) => [
                  ...projects,
                  setTableRow(project, projects.length),
                ]);
                dispatch(
                  setDetailedProject([
                    ...detailedProject,
                    setInitialProject(project, false),
                  ])
                );
              }
            }
          }}
        >
          <>
            <option value="">Select Projects</option>
            {filteredProjects.map((project) => (
              <option key={project?._id} value={project?._id}>
                {project?.description}
              </option>
            ))}
          </>
        </select>
      </div>
      <div className="ag-theme-alpine p-4 w-full h-auto">
        <AgGridReact
          columnDefs={tableColumn}
          rowData={projectRow}
          defaultColDef={useMemo(
            () => ({
              flex: 1,
            }),
            []
          )}
          animateRows={true}
          domLayout="autoHeight"
          // suppressPaginationPanel={true}
        />
      </div>
      <div className="flex justify-between my-[2rem] px-8">
        <Account />
        <Total
          flag={true}
          total={{
            subtotal: invoice?.subtotal,
            grandtotal: invoice?.GrandTotal,
            tds: invoice?.createdFor?.tds || 0,
            discount: invoice?.discount || 0,
            GST: invoice?.GST,
          }}
        />
      </div>
      {isChecked && (
        <CheckedModal key={uniqueKey} uniqueKey={uniqueKey || ""} />
      )}
    </>
  );
};

export default EditableTable;
