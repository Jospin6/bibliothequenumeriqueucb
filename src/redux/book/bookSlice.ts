import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SubjectProps } from "../subject/subjectSlice";

export interface FavoriteBook {
    userId: number;
    bookId: number;
}
export interface ViewProps {
    userId: number;
    bookId: number;
}

export interface BookProps {
    id?: number;
    title: string;
    author: string;
    file: File,
    FavoriteBook: FavoriteBook[]
    View: ViewProps[]
    subject: SubjectProps
    createdAt?: string;
}

interface BookState {
    loading: boolean;
    books: BookProps[];
    book: BookProps | null;
    forYou: BookProps[];
    subjectId: number | null
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    books: [],
    book: null,
    forYou: [],
    subjectId: null,
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

export const fetchBooks = createAsyncThunk(
    "book/fetchBooks",
    async ({ faculteId, subjectId }: { faculteId?: number; subjectId?: number | null }) => {
        let url = "/api/books";

        const params = new URLSearchParams();
        if (faculteId) params.append("faculteId", String(faculteId));
        if (subjectId) params.append("subjectId", String(subjectId));

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

export const fetchForYou = createAsyncThunk("book/fetchForYou", async (faculteId?: number) => {
    let url = "/api/books/forYou";
    const params = new URLSearchParams();
    if (faculteId) params.append("faculteId", String(faculteId));

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }

})

export const getBook = createAsyncThunk("book/getBook", async (bookId: number) => {
    try {
        const response = await axios.get(`/api/books/${bookId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const updateBook = createAsyncThunk("book/updateBook", async (
    { bookId, formData }: { bookId: number, formData: FormData }) => {
    try {
        const response = await axios.put(`/api/books/${bookId}`, formData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
})


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setSubject: (state, action) => {
            state.subjectId = action.payload
        }
    },
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

            .addCase(fetchForYou.pending, state => {
                state.loading = true
            })
            .addCase(fetchForYou.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.forYou = action.payload
            })
            .addCase(fetchForYou.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload as string
            })

            .addCase(getBook.pending, state => {
                state.loading = true
            })
            .addCase(getBook.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.book = action.payload
            })
            .addCase(getBook.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
});

export const selectBooks = (state: RootState) => state.book
export const selectSubjectId = (state: RootState) => state.book.subjectId
export const selectForYou = (state: RootState) => state.book.forYou
export const selectBook = (state: RootState) => state.book.book

export const { setSubject } = bookSlice.actions
export default bookSlice.reducer;