import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { init } from "next/dist/compiled/webpack/webpack"

interface authorisedUser {
    email: string,
    isActive?: boolean,
    faculteId: number,
}

interface authorisedUserState {
    loading: boolean,
    authorisedUsers: authorisedUser | null,
    error: string | null,
}

const initialState: authorisedUserState = {
    loading: false,
    authorisedUsers: null,
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

export const fetchAuthorizedUsers = createAsyncThunk("", async () => {
    try {
        const response = await axios.get("/api/authorisedUser")
        return response.data
    } catch (error: any) {
        console.error("Erreur: ", error.response?.data || error.message);
    }
})

const authorisedUserSlice = createSlice({
    name: "authorisedUser",
    initialState,
    reducers: {}
})


export default authorisedUserSlice.reducer