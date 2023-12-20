import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store/store";
import { getInvoiceById } from "../store/invoiceHistory";
import { invoiceHistoryType } from "@/types/types";

const useInvoice = () => {
  const router = useRouter();
  const rowID = router.query.id as string;

  const { invoiceById, isLoading, invoice } = useSelector<AppState>(
    (state) => state.history
  ) as invoiceHistoryType;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (rowID) {
      dispatch(getInvoiceById(rowID));
      //   setInvoiceStatus(localStorage.getItem("S") || "");
    }
  }, [rowID]);

  return { invoiceById, isLoading };
};

export default useInvoice;
