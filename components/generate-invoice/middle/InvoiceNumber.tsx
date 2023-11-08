import {
  setDate,
  setDueDate,
  setInvoiceNumber,
} from "@/components/store/invoice";
import { AppDispatch, AppState } from "@/components/store/store";
import { invoiceStateType } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InvoiceNumber = () => {
  const { Date: currentDate, DueDate, invoiceNumber } = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [date, setdate] = useState<Date | null>(currentDate);
  const [dueDate, setdueDate] = useState<Date | null>(DueDate);

  useEffect(() => {
    setdate(new Date());
    setdueDate(new Date());

    dispatch(setInvoiceNumber(Math.floor(100000 + Math.random() * 900000)));
    dispatch(setDate(date));
    dispatch(setDueDate(dueDate));
  }, []);

  const handleDateChange = (selectedDate: Date) => {
    const newDueDate = new Date(selectedDate);
    newDueDate.setDate(selectedDate.getDate() + 5);

    setdate(selectedDate);
    setdueDate(newDueDate);
    dispatch(setDate(selectedDate));
    dispatch(setDueDate(newDueDate));
  };

  const handleDueDateChange = (selectedDate: Date) => {
    setdueDate(selectedDate);
    dispatch(setDueDate(selectedDate));
  };

  return (
    <div>
      <div className="w-[80%]">
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label
            htmlFor="invoice"
            className="font-semibold xs:text-xs sm:text-md md:text-base"
          >
            Invoice Number:{" "}
          </label>
          <input
            type="text"
            id="invoice"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={invoiceNumber}
            disabled
            maxLength={8}
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label
            htmlFor="date"
            className="font-semibold xs:text-xs sm:text-md md:text-base"
          >
            Date:{" "}
          </label>
          <input
            type="date"
            id="date"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const dateValue = new Date(e.target.value);
              handleDateChange(dateValue);
            }}
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label
            htmlFor="duedate"
            className="font-semibold xs:text-xs sm:text-md md:text-base"
          >
            Due Date:{" "}
          </label>
          <input
            type="date"
            id="duedate"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2 xs:text-xs sm:text-sm md:text-md"
            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
            min={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const dateValue = new Date(e.target.value);
              handleDueDateChange(dateValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceNumber;

