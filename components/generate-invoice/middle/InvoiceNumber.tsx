import { setDate, setDueDate, setInvoiceNumber } from "@/components/store/invoice";
import { AppDispatch, AppState } from "@/components/store/store";
import { invoiceStateType } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InvoiceNumber = () => {
  const { invoiceNumber, Date, DueDate } = useSelector<AppState>(state => state.invoice) as invoiceStateType
  const dispatch = useDispatch<AppDispatch>()

  // const [invoiceNo, setInvoiceNo] = useState(invoiceNumber)

  const [invoiceNo, setInvoiceNo] = useState()
  const [date, setdate] = useState<Date | null>(Date)
  const [dueDate, setdueDate] = useState<Date | null>(DueDate)

  useEffect(() => {
    dispatch(setInvoiceNumber(invoiceNo))
    dispatch(setDate(date))
    dispatch(setDueDate(dueDate))
  }, [invoiceNo, date, dueDate])

  return (
    <div>
      <div className="w-[80%]">
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="invoice" className="font-semibold xs:text-xs sm:text-md md:text-base">
            Invoice Number:{" "}
          </label>
          <input
            type="text"
            id="invoice"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={invoiceNo}
            maxLength={8}
            onChange={e => setInvoiceNo(e.target.value)}
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="date" className="font-semibold xs:text-xs sm:text-md md:text-base">
            Date:{" "}
          </label>
          <input
            type="date"
            id="date"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={date ? date.toISOString().split('T')[0] : ''}
            onChange={e => {
              const dateValue = e.target.value;
              if (dateValue) {
                setdate(new window.Date(dateValue));
              } else {
                setdate(null);
              }
            }}
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="duedate" className="font-semibold xs:text-xs sm:text-md md:text-base">
            Due Date:{" "}
          </label>
          <input
            type="date"
            id="duedate"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
            min={dueDate?.toISOString().split('T')[0]}
            onChange={e => {
              const dateValue = e.target.value;
              if (dateValue) {
                setdueDate(new window.Date(dateValue));
              } else {
                setdueDate(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceNumber;
