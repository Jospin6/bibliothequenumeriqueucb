import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk("favorites/fetch", async (userId: number) => {
    const res = await axios.get(`/api/favorites/${userId}`);
    return res.data;
});

export const addFavorite = createAsyncThunk("favorites/add", async ({bookId, userId}: {bookId: string, userId: string}) => {
    await axios.post("/api/favorites", { bookId, userId });
    return bookId;
});

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: { books: [] as string[], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.books = action.payload.map((fav: any) => fav.bookId);
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
    },
});

export default favoritesSlice.reducer;
