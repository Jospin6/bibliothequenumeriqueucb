import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Faculty {
    id?: number;
    name: string;
}

interface FacultyState {
    loading: boolean;
    faculties: Faculty[];
    error: string | null;
}

const initialState: FacultyState = {
    loading: false,
    faculties: [],
    error: null,
};

export const addFaculty = createAsyncThunk(
    "faculty/addFaculty",
    async (formData: Faculty, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/faculties", {
                name: formData.name
            },  {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

export const fetchFaculties = createAsyncThunk("faculty/fetchFaculties", async () => {
    try {
        const response = await axios.get("/api/faculties")
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(fetchFaculties.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFaculties.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.faculties = action.payload
            })
            .addCase(fetchFaculties.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
});

export const selectFaculties = (state: RootState) => state.faculty.faculties

export default facultySlice.reducer;