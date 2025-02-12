import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './book/bookSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
    reducer: {
        book: bookReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch