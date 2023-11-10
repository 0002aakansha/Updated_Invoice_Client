import {
  PdfPreviewProps,
  invoiceHistoryType,
  invoiceType,
} from "@/types/types";
import { GrRotateRight } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import PdfPreview from "../generate-invoice/PdfPreview/PdfPreview";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { postInvoiceHistory, updateInvoice } from "../store/invoiceHistory";
import AlertDialogExample from "../alerts/AlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { setInvoiceNumber } from "../store/invoice";
import FullPageLoader from "../spinners/fullPageLoader";
import NotFound from "../alerts/notFound";
import { AgGridReact } from "ag-grid-react";
import { useInvoiceRowData } from "../hooks/useRowData";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const HistoryTable = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | MediaSource>();
  const [pdfPreviewData, setpdfPreviewData] = useState<PdfPreviewProps | any>();
  const [isPreviewOpen, onPreviewClose] = useState(false);
  const [isEditOpen, onEditClose] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const [date, setDate] = useState<Date | null>(new Date());
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdateOpen, onUpdateOpen] = useState<boolean>(false);

  // invoice number
  const { invoice, isLoading } = useSelector<AppState>(
    (state) => state.history
  ) as invoiceHistoryType;
  const { historyRow } = useInvoiceRowData();
  const [_id, setId] = useState<string | any>(invoice[0]?._id);
  const [invoiceData, setInvoiceData] = useState<invoiceType>(
    invoice.filter((invoice) => invoice?._id === _id)[0]
  );

  const tableColumn: any = [
    {
      headerName: "S. No.",
      field: "sno",
      resizable: true,
      headerClass: "custom-header",
      cellClass: "centered-cell",
      width: 80,
      pinned: "left",
      lockPinned: true,
    },
    {
      headerName: "Invoice Number",
      field: "invoiceNumber",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      pinned: "left",
      lockPinned: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Client",
      field: "client",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
      width: 300,
      // floatingFilter: true
    },
    {
      headerName: "Projects",
      field: "projects",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
      width: 300,
    },
    {
      headerName: "Created On",
      field: "createdOn",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Due Date",
      field: "dueDate",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Total",
      field: "subtotal",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "GST",
      field: "gst",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
      width: 300,
    },
    {
      headerName: "Subtotal",
      field: "total",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
    },
    {
      headerName: "Status",
      field: "status",
      resizable: true,
      headerClass: "custom-header",
      filter: true,
      cellClass: "centered-cell",
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center space-x-2 justify-center">
            <FontAwesomeIcon
              icon={faCircle}
              className={`${
                params?.data?.status === "raised"
                  ? " text-orange-600"
                  : " text-green-600"
              }`}
            />
            {params?.data?.status === "raised" ? (
              <p className="text-stone-800">Raised</p>
            ) : (
              <p className="text-stone-800">Cleared</p>
            )}
          </div>
        );
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass: "custom-header",
      cellClass: "centered-cell",
      pinned: "right",
      lockPinned: true,
      cellRenderer: (params: any) => (
        <div className="md:p-2 sm:pr-0 sm:pl-0 text-center cursor-pointer space-x-8 flex">
          <span className="block" title="Repeat">
            <GrRotateRight
              className="text-xl text-slate-700 cursor-pointer"
              onClick={() => {
                setId(params?.data?._id);
                onEditClose(true);
              }}
            />
          </span>
          <span title="Edit">
            <TbEditCircle
              className="text-xl text-slate-500 cursor-pointer"
              onClick={() => {
                setId(params?.data?._id);
                onUpdateOpen(true);
              }}
            />
          </span>
          <span className="block" title="Remove">
            <AiOutlineDelete
              className="text-xl text-red-500 cursor-pointer"
              onClick={() => {
                setId(params?.data?._id);
                setAlertOpen(true);
              }}
            />
          </span>
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
  const paginationPageSize = 15;

  const [error, setError] = useState<string>("");
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState<number | string>(
    ""
  );

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setInvoiceData(invoice.filter((invoice) => invoice?._id === _id)[0]);
  }, [_id, invoice]);

  useEffect(() => {
    invoice.length !== 0
      ? setLastInvoiceNumber(
          `${invoice[invoice.length - 1]?.invoiceNumber
            .toString()
            .slice(0, 4)}` +
            (
              +invoice[invoice.length - 1]?.invoiceNumber.toString().slice(4) +
              1
            )
              .toString()
              .padStart(2, "0")
        )
      : setLastInvoiceNumber("");
  }, [invoice]);

  useEffect(() => {

    if (isEditOpen) {
      setDate(new Date());
      const initialDueDate = new Date();
      initialDueDate.setDate(initialDueDate.getDate() + 5);
      setDueDate(initialDueDate);
    }

    if (
      invoice.filter((invoice) => +invoice.invoiceNumber === +lastInvoiceNumber)
        .length === 0
    ) {
      dispatch(setInvoiceNumber(lastInvoiceNumber));
      setError("");
    } else {
      setError("Invoice Number is already in use!");
      dispatch(setInvoiceNumber(""));
      return;
    }
  }, [invoice, lastInvoiceNumber]);

  useEffect(() => {

    if (
      typeof invoiceData?.createdFor !== "string" &&
      invoiceData?.invoiceCreatedBy &&
      date &&
      dueDate
    ) {
      setpdfPreviewData({
        invoice: {
          invoice: invoiceData?.projects,
          invoiceType: invoiceData?.invoiceType,
          invoiceNumber: lastInvoiceNumber,
          Date: date,
          DueDate: dueDate,
        },
        user: {
          name: invoiceData?.invoiceCreatedBy?.name,
          email: invoiceData?.invoiceCreatedBy?.email,
          address: invoiceData?.invoiceCreatedBy?.address,
          contact: invoiceData?.invoiceCreatedBy?.contact,
          account: invoiceData?.invoiceCreatedBy?.account,
          pan: invoiceData?.invoiceCreatedBy?.pan,
          gstin: invoiceData?.invoiceCreatedBy?.gstin,
        },
        client: {
          name: invoiceData?.createdFor?.name,
          gstin: invoiceData?.createdFor?.gstin,
          address: invoiceData?.createdFor?.address,
        },
        total: {
          subtotal: invoiceData?.subtotal,
          GST: invoiceData?.GST,
          GrandTotal: invoiceData?.GrandTotal,
        },
      });
    }
  }, [
    date,
    dueDate,
    invoiceData?.GST,
    invoiceData?.GrandTotal,
    invoiceData?.createdFor,
    invoiceData.createdOn,
    invoiceData.dueDate,
    invoiceData?.invoiceCreatedBy,
    invoiceData.invoiceNumber,
    invoiceData?.invoiceType,
    invoiceData?.projects,
    invoiceData?.subtotal,
    lastInvoiceNumber,
    invoiceData,
  ]);

  const generatePDF = async (e: FormEvent) => {
    e.preventDefault();

    if (lastInvoiceNumber !== "" && date && dueDate) {
      onPreviewClose(true);
      onEditClose(false);

      const pdfData = await pdf(<PdfPreview data={pdfPreviewData} />).toBlob();
      setPdfBlob(pdfData);
    } else toast.error("All fields are required!");
  };

  const downloadPDF = () => {
    // console.log(invoiceData);

    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "invoice.pdf";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    dispatch(
      postInvoiceHistory({
        createdFor: invoiceData?.createdFor?._id,
        invoiceNumber: lastInvoiceNumber.toString(),
        createdOn: date?.toLocaleDateString("en-GB"),
        dueDate: dueDate?.toLocaleDateString("en-GB"),
        projects: invoiceData?.projects?.map(
          (project: {
            id: any;
            projectDetails: { _id: any };
            period: any;
            workingDays: any;
            totalWorkingDays: any;
            hours: string;
            amount: string | number;
          }) => {
            return {
              id: project?.id,
              projectDetails: project?.projectDetails?._id,
              period: project?.period,
              workingDays: project?.workingDays,
              totalWorkingDays: project?.totalWorkingDays,
              hours: project?.hours,
              amount: +project?.amount,
            };
          }
        ),
        subtotal: invoiceData?.subtotal,
        GST: invoiceData?.GST,
        GrandTotal: invoiceData?.GrandTotal,
        status: "raised",
        invoiceType: invoiceData?.invoiceType,
        active: true,
      })
    );
    onPreviewClose(false);
    setInvoiceNumber("");
    setDate(null);
    setDueDate(null);
  };

  const updateHandler = (e: FormEvent) => {
    e.preventDefault();

    if (invoiceData?._id)
      dispatch(
        updateInvoice({ id: invoiceData?._id, dataToUpdate: { status } })
      );
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      {isLoading && invoice?.length ? (
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
            rowData={historyRow} // cells
            animateRows={true}
            domLayout="autoHeight"
          />
        </div>
      )}
      {isEditOpen && (
        <Modal isOpen={isEditOpen} onClose={() => onEditClose(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <form action="" onSubmit={generatePDF}>
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="font-semibold text-lg">
                    Invoice Number
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Invoice Number"
                      className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                      maxLength={8}
                      value={lastInvoiceNumber}
                      onChange={(e) => setLastInvoiceNumber(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500 text-[10pt] py-1 px-2 font-semibold">
                        {error}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="font-semibold text-lg">
                    Date
                  </label>
                  <input
                    type="date"
                    placeholder="Date"
                    className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                    value={date ? date.toISOString().split('T')[0] : ''}
                    // onChange={(e) => {
                    //   const dateValue = e.target.value;
                    //   if (dateValue) {
                    //     setDate(new window.Date(dateValue));
                    //   } else {
                    //     setDate(null);
                    //   }
                    // }}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const dueDate = new Date(selectedDate);
                      dueDate.setDate(selectedDate.getDate() + 5); 
                      setDate(selectedDate); 
                      setDueDate(dueDate); 
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="font-semibold text-lg">
                    Due Date
                  </label>
                  <input
                    type="date"
                    placeholder="Due Date"
                    className="border-2 mt-2 px-4 py-2 rounded-sm outline-none"
                    // min={today}
                    value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                    min={date ? date.toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      if (dateValue) {
                        setDueDate(new window.Date(dateValue));
                      } else {
                        setDueDate(null);
                      }
                    }}
                    required
                  />
                </div>
                <ModalFooter>
                  <Button
                    className="bg-stone-200"
                    mr={3}
                    onClick={() => onEditClose(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#5a51be] text-stone-100 px-4 py-2 hover:bg-[#6960cc]"
                  >
                    Download PDF
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {isUpdateOpen && (
        <Modal isOpen={isUpdateOpen} onClose={() => onUpdateOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <form action="" onSubmit={updateHandler} className="my-4">
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="font-semibold text-lg">
                    Status
                  </label>
                  <select
                    className="border-2 mt-2 px-4 py-2 rounded-sm outline-none bg-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="raised">Raised</option>
                    <option value="cleared">Cleared</option>
                  </select>
                </div>
                <ModalFooter>
                  <Button
                    className="bg-stone-200"
                    mr={3}
                    onClick={() => onUpdateOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#5a51be] text-stone-100 px-4 py-2 hover:bg-[#6960cc]"
                  >
                    Update
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {isPreviewOpen && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => onPreviewClose(false)}
          size="4xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <PDFViewer width="100%" height="550em">
                <PdfPreview data={pdfPreviewData} />
              </PDFViewer>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-stone-200"
                mr={3}
                onClick={() => onPreviewClose(false)}
                size={"sm"}
              >
                Close
              </Button>
              <Button
                className="bg-[#5a51be] text-stone-100 px-4  hover:bg-[#6960cc]"
                onClick={downloadPDF}
                size={"sm"}
              >
                Download PDF
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isAlertOpen && (
        <AlertDialogExample
          _id={invoiceData?._id || ""}
          isOpen={isAlertOpen}
          onClose={setAlertOpen}
          filter="invoiceDelete"
        />
      )}
    </>
  );
};

export default HistoryTable;
