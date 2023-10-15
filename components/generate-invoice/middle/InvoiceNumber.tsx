const InvoiceNumber = () => {
  return (
    <div>
      <div className="w-[60%]">
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="invoice" className="font-semibold">
            Invoice Number:{" "}
          </label>
          <input
            type="text"
            id="invoice"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2"
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="date" className="font-semibold">
            Date:{" "}
          </label>
          <input
            type="date"
            id="date"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2"
          />
        </div>
        <div className="my-2 p-1 rounded-sm flex justify-between">
          <label htmlFor="duedate" className="font-semibold">
            Due Date:{" "}
          </label>
          <input
            type="date"
            id="duedate"
            className="bg-transparent outline-none border px-2 border-stone-300 p-1 rounded-sm w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceNumber;
