import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BookProps, ViewProps } from "../book/bookSlice";
import { SubjectProps } from "../subject/subjectSlice";

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
    faculteId?: number,
    faculty?: Faculty;
    password?: string
    FavoriteBook?: FavoriteBookProps[]
    View?: ViewProps[]
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

export const changeUserRole = createAsyncThunk("", async (data: {userId: number, role: string}) => {
    try {
        let url = `/api/users/changeUserRole`
        const response = await axios.post(url, data)
        return response.data 
    } catch (error) {
        throw new Error(error as string)
    }
})

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId: number) => {
    try {
        let url = `/api/users/${userId}`
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (data: { id: string, name: string, postnom: string }) => {
    try {
        let url = `/api/users/${data.id}`
        const response = await axios.put(url, data)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const updatePassword = createAsyncThunk("user/updatePassword", async (data: { id: string, oldPassword: string, newPassword: string }) => {
    try {
        let url = `/api/users/${data.id}/password`
        const response = await axios.put(url, data)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    try {
        const response = await axios.delete("/api/logout")
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    try {
        let url = `/api/users`
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId: number) => {
    try {
        let url = `/api/users/${userId}`
        const response = await axios.delete(url)
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

            .addCase(fetchUsers.pending, state => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false
                state.error = "An error occured"
            })

            .addCase(fetchUser.pending, state => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
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
export const selectUsers = (state: RootState) => state.user.users

export default userSlice.reducer;