import { invoiceStateType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: invoiceStateType = {
    invoiceType: '',
    isChecked: false,
    projectDataType: [],
    subtotal: 0.0,
    setisChecked: () => { },
    setInvoiceType: () => { },
    setDataOnChecked: () => { },
    setterOfProjectDataType: () => { },
    calculateSubtotal: () => { }
}

const invoiceslice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default invoiceslice.reducer