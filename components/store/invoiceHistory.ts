import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getCookie } from "@/utils/cookies";
import { client } from "@/axios/instance/client";
import { invoiceHistoryType, invoiceType } from "@/types/types";

const initialState: invoiceHistoryType = {
    invoice: [{
        _id: '',
        createdFor: '',
        invoiceNumber: "",
        createdOn: '',
        dueDate: '',
        projects: [],
        subtotal: 0.0,
        GST: 0,
        GrandTotal: 0.0,
        status: '',
        invoiceType: ''
    }],
    isLoading: false,
    created: false,
    updated: false,
    error: { status: '', message: '' }
};

export const postInvoiceHistory = createAsyncThunk('invoice/history/create', async (invoice: invoiceType, { rejectWithValue }) => {
    try {
        const { data } = await client({
            url: `/invoice`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: getCookie(),
            },
            data: JSON.stringify(invoice),
        });

        if (data.status === "true") return data;
        else throw new Error(data.message);

    } catch (error: any) {
        return rejectWithValue({
            status: error.response.status,
            message:
                error.response.data.message ||
                error.message ||
                "An unknown error has been occured, Please try again later!",
        });
    }
})

export const getAllInvoice = createAsyncThunk('invoice/history/getAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await client({
            url: `/invoice`,
            method: "GET",
            headers: {
                Authorization: getCookie(),
            },
        });

        if (data.status === "true") return data;
        else throw new Error(data.message);

    } catch (error: any) {
        return rejectWithValue({
            status: error.response.status,
            message:
                error.response.data.message ||
                error.message ||
                "An unknown error has been occured, Please try again later!",
        });
    }
})

const historyslice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postInvoiceHistory.pending, state => {
            state.isLoading = true
            state.error = initialState.error
        })
        builder.addCase(postInvoiceHistory.fulfilled, (state, { payload }) => {
            state.invoice.push({ ...payload })
            state.isLoading = initialState.isLoading
            state.error = initialState.error
        })
        builder.addCase(postInvoiceHistory.rejected, (state, { payload }) => {
            state.invoice = initialState.invoice
            state.isLoading = initialState.isLoading
            state.error = payload
        })
        // get all
        builder.addCase(getAllInvoice.pending, state => {
            state.isLoading = true
            state.error = initialState.error
        })
        builder.addCase(getAllInvoice.fulfilled, (state, { payload }) => {
            state.invoice = payload.allInvoices
            state.isLoading = initialState.isLoading
            state.error = initialState.error
        })
        builder.addCase(getAllInvoice.rejected, (state, { payload }) => {
            state.invoice = initialState.invoice
            state.isLoading = initialState.isLoading
            state.error = payload
        })
    },
});

export const { } = historyslice.actions;
export default historyslice.reducer;
