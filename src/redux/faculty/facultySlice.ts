import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Faculty {
    id?: number;
    nom: string;
    description: string;
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
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/faculties", formData,  {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});

export default facultySlice.reducer;