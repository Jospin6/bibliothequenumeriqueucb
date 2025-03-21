import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './book/bookSlice'
import userReducer from './user/userSlice'
import subjectReducer from './subject/subjectSlice'
import facultyReducer from './faculty/facultySlice'
import favoritesReducer from "./favories/favoritesSlice"
import authorisedUserReducer from "./user/authorisedUserSlice"

export const store = configureStore({
    reducer: {
        book: bookReducer,
        user: userReducer,
        subject: subjectReducer,
        faculty: facultyReducer,
        favorites: favoritesReducer,
        authorisedUser: authorisedUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch