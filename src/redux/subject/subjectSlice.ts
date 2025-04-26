import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BookProps } from "../book/bookSlice";

export interface SubjectProps {
    id?: number;
    name: string;
    faculteId: number;
    books?: BookProps[];
}

interface BookState {
    loading: boolean;
    subjects: SubjectProps[];
    subject: SubjectProps | null;
    error: string | null;
}

const initialState: BookState = {
    loading: false,
    subjects: [],
    subject: null,
    error: null,
};

export const addSubject = createAsyncThunk(
    "subject/addUser",
    async (formData: SubjectProps, { rejectWithValue }) => {
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

export const getSubject = createAsyncThunk("subject/getSubject", async (subjectId: number) => {
    try {
        const response = await axios.get(`/api/subjects/${subjectId}`)
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const updateSubject = createAsyncThunk("subject/getSubject", async ({id, name}: {id: number, name: string}) => {
    try {
        const response = await axios.put(`/api/subjects/${id}`, {name})
        return response.data
    } catch (error) {
        throw new Error(error as string)
    }
})

export const deleteSubject = createAsyncThunk("subject/deleteSubject", async (id: number) => {
    try {
        const response = await axios.delete(`/api/subjects/${id}`)
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
            .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<SubjectProps[]>) => {
                state.loading = false
                state.subjects = action.payload
            })
            .addCase(fetchSubjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getSubject.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.subject = action.payload
            })
    },
});

export const selectSubject = (state: RootState) => state.subject.subjects
export const selectOneSubject = (state: RootState) => state.subject.subject

export default userSlice.reducer;