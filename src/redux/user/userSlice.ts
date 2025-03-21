import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BookProps, ViewProps } from "../book/bookSlice";
import { Subject } from "../subject/subjectSlice";

interface Faculty {
    id: number
    name: string
}

interface FavoriteBookProps {
    userId: number;
    bookId: number;
    book: BookProps
}

interface User {
    id?: number;
    name: string;
    postnom: string;
    email: string;
    role?: string;
    faculty?: Faculty;
    password?: string
    FavoriteBook: FavoriteBookProps[]
}

interface UserState {
    loading: boolean;
    users: User[];
    user: User | null
    currentUser: User | null
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    user: null,
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
                    postnom: data.postnom,
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

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId: number) => {
    try {
        let url =`/api/users/${userId}`
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

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

            .addCase(fetchUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
});

export const selectCurrentUser = (state: RootState) => state.user.currentUser
export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer;