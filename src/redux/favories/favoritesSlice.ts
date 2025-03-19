import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk("favorites/fetch", async () => {
    const res = await fetch("/api/favorites");
    return res.json();
});

export const addFavorite = createAsyncThunk("favorites/add", async ({bookId, userId}: {bookId: string, userId: string}) => {
    await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ bookId, userId }),
        headers: { "Content-Type": "application/json" },
    });
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
