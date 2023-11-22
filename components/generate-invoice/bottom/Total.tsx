import { calculateGST, calculateSubtotal, setDiscount } from "@/components/store/invoice";
import { AppDispatch, AppState } from "@/components/store/store";
import { invoiceStateType } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Total = () => {
  const { subtotal, GST, GrandTotal } = useSelector<AppState>(
    (state) => state.invoice
  ) as invoiceStateType;
  const dispatch = useDispatch<AppDispatch>();

  const [discount, setdiscount] = useState<string | number>("");
  const [discountedSubtotal, setDiscountedSubtotal] = useState(subtotal);

  useEffect(() => {
    if (discount) {
      dispatch(calculateSubtotal({ flag: true, discount: discountedSubtotal }));
      dispatch(calculateGST({ userState: "", clientState: "" }));
    } else {
      dispatch(calculateSubtotal({ flag: false }));
      dispatch(calculateGST({ userState: "", clientState: "" }));
    }
  }, [discountedSubtotal, discount]);

  return (
    <div className="">
      <div className="flex justify-between space-x-12 font-semibold">
        <h1>DISCOUNT</h1>
        <input
          type="number"
          placeholder="0%"
          style={{ width: "2em", textAlign: "end" }}
          className="border  rounded-md focus:border-gray-400 outline-none p-1"
          value={discount}
          onChange={(e: any) => {
            setdiscount(e.target.value);
            dispatch(setDiscount(+e.target.value));
            const discountValue = (+e.target.value / 100) * subtotal;
            const updatedDiscountedSubtotal = subtotal - discountValue;
            setDiscountedSubtotal(updatedDiscountedSubtotal);
          }}
        />
      </div>
      <div className="flex justify-between space-x-12 font-semibold">
        <h1>SUBTOTAL</h1>
        <h5>{subtotal}</h5>
      </div>
      {typeof GST === "object" ? (
        <>
          <div className="flex justify-between space-x-12 font-semibold">
            <h1>CGST@ 9%</h1>
            <h5>{GST.CGST}</h5>
          </div>
          <div className="flex justify-between space-x-12 font-semibold">
            <h1>SGST@ 9%</h1>
            <h5>{GST.SGST}</h5>
          </div>
        </>
      ) : (
        <div className="flex justify-between space-x-12 font-semibold">
          <h1>GST@ 18%</h1>
          <h5>{typeof GST === "number" && GST}</h5>
        </div>
      )}
      <div className="flex space-x-12 text-stone-100 bg-[#5a51be]">
        <h1 className=" me-1 px-4 py-1 font-semibold rounded-sm">TOTAL</h1>
        <h5 className="ms-1 px-4 py-1 font-semibold rounded-sm">
          {GrandTotal}
        </h5>
      </div>
    </div>
  );
};

export default Total;
