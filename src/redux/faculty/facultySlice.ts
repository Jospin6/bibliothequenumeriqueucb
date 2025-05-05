import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "@/types/user_type";
import { SubjectProps } from "../subject/subjectSlice";
import { BookProps } from "../book/bookSlice";

export interface Faculty {
    id?: number;
    name: string;
    users?: User[];
    subjects?: SubjectProps[];
    books?: BookProps[];
}

interface FacultyState {
    loading: boolean;
    faculties: Faculty[];
    faculty: Faculty | null;
    error: string | null;
}

const initialState: FacultyState = {
    loading: false,
    faculties: [],
    faculty: null,
    error: null,
};

export const addFaculty = createAsyncThunk(
    "faculty/addFaculty",
    async (formData: Faculty, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/faculties", {
                name: formData.name
            },  {
                headers: { "Content-Type": "application/json", },
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

export const fetchFaculty = createAsyncThunk("faculty/fetchFaculty", async (id: number) => {
    try {
        const response = await axios.get(`/api/faculties/${id}`)
        console.log("response fac data", response.data)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const updateFaculty = createAsyncThunk("faculty/updateFaculty", async ({id, name}: {id: number, name: string}) => {
    try {
        const response = await axios.put(`/api/faculties/${id}`, {
            name
        })
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const deleteFaculty = createAsyncThunk("faculty/deleteFaculty", async (id: number) => {
    try {
        const response = await axios.delete(`/api/faculties/${id}`)
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
            .addCase(fetchFaculties.fulfilled, (state, action: PayloadAction<Faculty[]>) => {
                state.loading = false
                state.faculties = action.payload
            })
            .addCase(fetchFaculties.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(fetchFaculty.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFaculty.fulfilled, (state, action: PayloadAction<Faculty>) => {
                state.loading = false
                state.faculty = action.payload
            })
            .addCase(fetchFaculty.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
});

export const selectFaculties = (state: RootState) => state.faculty.faculties
export const selectFaculty = (state: RootState) => state.faculty.faculty

export default facultySlice.reducer;