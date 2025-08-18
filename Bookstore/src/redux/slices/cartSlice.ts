import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../../types/TCart";
import type { BookListItem } from "../../types/TBook";
import type { RootState } from "../store/store";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<BookListItem>) {
      const book = action.payload;
      const existing = state.items.find((item) => item.book.isbn13 === book.isbn13);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ book, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.book.isbn13 !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartCount =(state: RootState) =>
    state.cart.items.reduce((sum, item)=> sum+item.quantity,0);