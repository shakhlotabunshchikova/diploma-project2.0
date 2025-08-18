import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../slices/booksSlice'
import cartReducer from '../slices/cartSlice'

export const store = configureStore({
    reducer: {
        books: bookReducer,
        cart: cartReducer,

    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;