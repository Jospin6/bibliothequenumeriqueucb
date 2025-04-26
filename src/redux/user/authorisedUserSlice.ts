import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { init } from "next/dist/compiled/webpack/webpack"
import { RootState } from "../store"

interface authorisedUser {
    id?: number,
    email: string,
    isActive?: boolean,
    faculteId: number,
}

interface authorisedUserState {
    loading: boolean,
    authorisedUsers: authorisedUser | null,
    facAuthorisedUsers: authorisedUser[],
    error: string | null,
}

const initialState: authorisedUserState = {
    loading: false,
    authorisedUsers: null,
    facAuthorisedUsers: [],
    error: ""
}

export const createAuthorisation = createAsyncThunk("authorisedUser/createAuthorisation", async (data: authorisedUser) => {
    try {
        const response = await axios.post("/api/authorisedUser", {
            email: data.email,
            faculteId: data.faculteId
        })
        return response.data
    } catch (error: any) {
        console.error("Erreur: ", error.response?.data || error.message);
    }
})

export const fetchAuthorizedUsers = createAsyncThunk("authorisedUser/fetchAuthorizedUsers", async () => {
    try {
        const response = await axios.get("/api/authorisedUser")
        return response.data
    } catch (error: any) {
        console.error("Erreur: ", error.response?.data || error.message);
    }
})

export const fetchAuthorizedFacultyUsers = createAsyncThunk("authorisedUser/fetchAuthorizedFacultyUsers", async (facId: number) => {
    try {
        const response = await axios.get(`/api/authorisedUser?faculteId=${facId}`)
        return response.data
    } catch (error: any) {
        console.error("Erreur: ", error.response?.data || error.message);
    }
})

export const deleteAuthorisation = createAsyncThunk("authorisedUser/deleteAuthorisation", async (id: number) => {
    try {
        const response = await axios.delete(`/api/authorisedUser/${id}`)
        return response.data
    } catch (error: any) {
        console.error("Erreur: ", error.response?.data || error.message);
    }
})

const authorisedUserSlice = createSlice({
    name: "authorisedUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAuthorisation.fulfilled, (state, action: PayloadAction<any>) => {
                state.facAuthorisedUsers.push(action.payload)
            })
            .addCase(fetchAuthorizedFacultyUsers.pending, state => {
                state.loading = true
            })
            .addCase(fetchAuthorizedFacultyUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.facAuthorisedUsers = action.payload
            })
            .addCase(fetchAuthorizedFacultyUsers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const selectAuthorizedFacultyUsers = (state: RootState) => state.authorisedUser.facAuthorisedUsers

export default authorisedUserSlice.reducer