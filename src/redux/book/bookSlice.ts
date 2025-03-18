import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Book {
    id?: number;
    title: string;
    author: string;
    file: File
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
            const response = await axios.post("/api/books", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

export const fetchBooks = createAsyncThunk("book/fetchBooks", async (faculteId?: number) => {
    let url = faculteId ? `/api/books?faculteId=${faculteId}` : "/api/books"
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
})

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, state => {
                state.loading = true
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.books = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
});

export const selectBooks = (state: RootState) => state.book

export default bookSlice.reducer;