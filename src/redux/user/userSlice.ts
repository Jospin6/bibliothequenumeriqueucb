import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id?: number;
    nom: string;
    postom: string;
    email: string;
    role: string;
    faculte?: string;
    password?: string
}

interface BookState {
    loading: boolean;
    users: User[];
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    users: [],
    error: null,
};

export const addUser = createAsyncThunk(
    "user/addUser",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users", formData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default userSlice.reducer;