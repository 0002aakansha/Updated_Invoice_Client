import { projectStateType, projectType } from "@/types/types";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { client } from "@/axios/instance/client";
import { getCookie } from "@/utils/cookies";

const initialState: projectStateType = {
  projects: [],
  isLoading: false,
  created: false,
  error: { status: "", message: "" },
};

export const createProject = createAsyncThunk(
  "project/create",
  async (projectData: projectType, { rejectWithValue }) => {
    try {
      const { data } = await client({
        url: `/projects`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie(),
        },
        data: JSON.stringify(projectData),
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
  }
);

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client({
        url: `/projects`,
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
  }
);

export const UpdateProject = createAsyncThunk(
  "project/update",
  async (
    { cid, project }: { cid: string; project: projectType },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await client({
        url: `/projects/${cid}/${project._id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie(),
        },
        data: JSON.stringify({
          description: project.description,
          conversionRate: project.conversionRate,
          rate: project.rate,
          projectAmount: project.projectAmount,
        }),
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
  }
);

export const DeleteProject = createAsyncThunk(
  "project/delete",
  async ({ cid, pid }: { cid: string; pid: string }, { rejectWithValue }) => {
    try {
      const { data } = await client({
        url: `/projects/${cid}/${pid}`,
        method: "DELETE",
        headers: {
          Authorization: getCookie(),
        },
      });

      if (data.status === "true") return pid;
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
  }
);

const projectslice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
      state.created = false;
      state.error = { status: "", message: "" };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.isLoading = false;

      console.log(action.payload);
      
      state.created = true;
      state.projects = [...current(state.projects), action.payload.new];
      state.error = { status: "", message: "" };
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.created = false;
      state.isLoading = false;
      state.error = action.payload as {
        status: number | string;
        message: string;
      };
    });

    // fetch
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
      state.projects = initialState.projects;
      state.error = { status: "", message: "" };
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;

      state.projects = action.payload?.allListedProjects;
      state.error = { status: "", message: "" };
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as {
        status: number | string;
        message: string;
      };
    });

    // update project
    builder.addCase(UpdateProject.pending, (state) => {
      state.isLoading = true;
      state.error = { status: "", message: "" };
    });
    builder.addCase(UpdateProject.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = { status: "", message: "" };
    });
    builder.addCase(UpdateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as {
        status: number | string;
        message: string;
      };
    });

    // delete project
    builder.addCase(DeleteProject.pending, (state) => {
      state.isLoading = true;
      state.error = { status: "", message: "" };
    });
    builder.addCase(DeleteProject.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      const filteredArray = current(state.projects).filter(
        (project) => project._id !== payload
      );
      state.projects = [...filteredArray];
      state.error = { status: "", message: "" };
    });
    builder.addCase(DeleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as {
        status: number | string;
        message: string;
      };
    });
  },
});

export default projectslice.reducer;