import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
    id?: number;
    title: string;
    author: string;
    // Add other book properties as needed
}

interface BookState {
    loading: boolean;
    books: Book[];
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    books: [],
    error: null,
};

export const addBook = createAsyncThunk(
    "book/addBook",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/books", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default bookSlice.reducer;