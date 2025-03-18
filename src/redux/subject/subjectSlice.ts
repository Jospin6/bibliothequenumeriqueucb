import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Subject {
    id?: number;
    name: string;
    faculteId: number;
}

interface BookState {
    loading: boolean;
    subjects: Subject[];
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    subjects: [],
    error: null,
};

export const addSubject = createAsyncThunk(
    "subject/addUser",
    async (formData: Subject, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/subjects", {
                name: formData.name,
                faculteId: formData.faculteId
            },  {
                headers: { "Content-Type": "application/json", },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du livre");
        }
    }
);

export const fetchSubjects = createAsyncThunk("subject/fetchSubjects", async (faculteId?: number) => {
    try {
        let url = faculteId ? `/api/subjects?faculteId=${faculteId}`: "/api/subjects"
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

const userSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, state => {
                state.loading = true
            })
            .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.subjects = action.payload
            })
            .addCase(fetchSubjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
});

export const selectSubject = (state: RootState) => state.subject.subjects

export default userSlice.reducer;