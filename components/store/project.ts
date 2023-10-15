import { projectStateType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "@/axios/instance/client";
import { getCookie } from "@/utils/cookies";

const initialState: projectStateType = {
    projects: [],
    isLoading: false,
    error: { status: '', message: '' }
}

export const fetchProjects = createAsyncThunk('client/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await client({
            url: `/projects`,
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

const projectslice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchProjects.pending, state => {
            state.isLoading = true
            state.projects = initialState.projects
            state.error = { status: '', message: '' }
        })
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.isLoading = false
            
            console.log(action.payload);
            
            state.projects = action.payload?.allListedProjects
             
            state.error = { status: '', message: '' }
        })
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as { status: number | string, message: string }
        })
    }
})

export default projectslice.reducer