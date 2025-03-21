import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchViews = createAsyncThunk("view/fetchViews", async (userId: number) => {
    const res = await axios.get(`/api/views/${userId}`);
    return res.data;
});

export const addView = createAsyncThunk("favorites/add", async ({bookId, userId}: {bookId: string, userId: string}) => {
    const response = await axios.post("/api/views", { bookId, userId });
    console.log(response.data)
    return bookId;
});

const viewSlice = createSlice({
    name: "view",
    initialState: { books: [] as string[], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchViews.fulfilled, (state, action) => {
                state.books = action.payload.map((fav: any) => fav.bookId);
            })
            .addCase(addView.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
    },
});

export default viewSlice.reducer;
