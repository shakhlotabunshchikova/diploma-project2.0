import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../../types/TCart";
import type { BookListItem } from "../../types/TBook";
import type { RootState } from "../store/store";


const initialState: CartState = {
  items: [] as CartItem[],
  totalQty: 0
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
      state.totalQty += 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const isbn = action.payload;
      const i = state.items.findIndex(it => it.book.isbn13 === isbn);
      if (i >= 0) {
        state.totalQty -= state.items[i].quantity; 
        state.items.splice(i, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQty = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartCount = (s: RootState) => s.cart.totalQty; 
export const selectCartSubtotal = (s: RootState) =>
  s.cart.items.reduce((sum, { book, quantity }) => {
    const num = Number((book.price || "").replace(/[^0-9.]/g, ""));
    return sum + (Number.isFinite(num) ? num * quantity : 0);
  }, 0);