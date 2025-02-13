import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Subject {
    id?: number;
    nom: string;
    description: string;
}

interface BookState {
    loading: boolean;
    subjects: Subject[];
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    subjects: [],
    error: null,
};

export const addSubject = createAsyncThunk(
    "subject/addUser",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/subjects", formData,  {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

const userSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default userSlice.reducer;