import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
    id?: number;
    name: string;
    postom: string;
    email: string;
    role?: string;
    faculte?: number;
    password?: string
}

interface UserState {
    loading: boolean;
    users: User[];
    currentUser: User | null
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    users: [],
    currentUser: null,
    error: null,
};

export const fetchcurrentUser = createAsyncThunk(
    "user/currentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Erreur inconnue");
            }
            return rejectWithValue("Erreur inconnue");
        }
    }
);

export const postLogin = createAsyncThunk("user/postLogin", async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/login",
            {
                email: email,
                password: password,
            }
            , {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return response.data;
    } catch (error: any) {
        console.error("Erreur Axios :", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
})

export const postUser = createAsyncThunk(
    "user/register",
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/registration",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    postnom: data.postom,
                }
                , {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            return response.data;
        } catch (error: any) {
            console.error("Erreur Axios :", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Erreur inconnue");
        }
    }
);

export const addUser = createAsyncThunk(
    "user/addUser",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users", formData);
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchcurrentUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchcurrentUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload
            })
            .addCase(fetchcurrentUser.rejected, (state) => {
                state.loading = false
                state.error = "An error occured"
            })
    },
});

export const selectCurrentUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer;