import { client } from "@/axios/instance/client";
import { clientStateType } from "@/types/types";
import { getCookie } from "@/utils/cookies";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: clientStateType = {
    clients: [],
    isLoading: false,
    error: { status: '', message: '' }
}

export const fetchClient = createAsyncThunk('client/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await client({
            url: `/companies`,
            headers: {
                Authorization: getCookie()
            }
        })

        if (data.status === 'true') return data
        else throw new Error(data.message)

    } catch (error: any) {
        return rejectWithValue({ status: error.response.status, message: error.response.data.message || error.message || 'An unknown error has been occured, Please try again later!' })
    }
})

const clientslice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchClient.pending, state => {
            state.isLoading = true
            state.clients = initialState.clients
            state.error = { status: '', message: '' }
        })
        builder.addCase(fetchClient.fulfilled, (state, action) => {
            state.isLoading = false
            
            state.clients = action.payload.allListedCompanies
            state.error = { status: '', message: '' }
        })
        builder.addCase(fetchClient.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as { status: number | string, message: string }
        })
    }
})

export default clientslice.reducer