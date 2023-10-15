import { dataProps, invoiceStateType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: invoiceStateType = {
  invoiceType: "monthly",
  isChecked: false,
  detailedProject: [],
  subtotal: 0.0,
  GST: 0,
  GrandTotal: 0.0,
};

const invoiceslice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoiceType(state, action) {
      state.invoiceType = action.payload;
    },
    setisChecked(state, action) {
      state.isChecked = action.payload;
    },
    updatedChecked(
      state,
      { payload }: { payload: { indx: number; checked: boolean } }
    ) {
      state.detailedProject[+payload.indx].checked = payload.checked;
    },
    setDetailedProject(state, action) {
      state.detailedProject = action.payload;
    },
    updateDetailedProjectOnChecked(state, { payload }: { payload: dataProps }) {
      const project = state.detailedProject[payload.id];

      if (
        state.invoiceType === "monthly" &&
        payload.period &&
        payload.workingDays &&
        payload.totalWorkingDays
      ) {
        const projectAmount = Number(project?.projectAmount);
        const workingDays = Number(payload?.workingDays);
        const totalWorkingDays = Number(payload?.totalWorkingDays);
        const amount = (
          (projectAmount / totalWorkingDays) *
          workingDays
        ).toFixed(3);

        state.detailedProject[payload.id] = { ...payload, amount };
      } else if (payload.hours) {
        const rate = Number(project?.rate?.rate);
        const currency = project?.rate?.currency;
        const hours = Number(payload?.hours);
        const conversionRate = Number(project?.conversionRate);

        const amount =
          currency === "INR" ? rate * hours : rate * conversionRate * hours;

        state.detailedProject[payload.id] = {
          ...payload,
          amount: amount.toFixed(3),
        };
      }
    },
    calculateSubtotal(state) {
      const istrue = state.detailedProject.filter(
        (project) => project.checked === true
      );

      const data = istrue.reduce(
        (value, project) => (value += Number(project.amount)),
        0
      );
      state.subtotal = +data.toFixed(3);
    },
    calculateGST(
      state,
      { payload }: { payload: { userState: string; clientState: string } }
    ) {
      console.log(payload);
      
      if (
        payload.userState.toLowerCase() === payload.clientState.toLowerCase()
      ) {
        const CGST = +((state.subtotal * 9) / 100).toFixed(3);
        const SGST = +((state.subtotal * 9) / 100).toFixed(3);
        console.log('subtotal' + state.subtotal, CGST, SGST);

        state.GST = { CGST, SGST };
        state.GrandTotal = +(state.subtotal + state.GST.CGST + state.GST.SGST).toFixed(3);
      } else {
        state.GST = (state.subtotal * 18) / 100;
        state.GrandTotal = +(state.subtotal + state.GST).toFixed(3);
      }
    },
  },
  extraReducers: {},
});

export const {
  setInvoiceType,
  setisChecked,
  setDetailedProject,
  updateDetailedProjectOnChecked,
  calculateSubtotal,
  updatedChecked,
  calculateGST,
} = invoiceslice.actions;
export default invoiceslice.reducer;
