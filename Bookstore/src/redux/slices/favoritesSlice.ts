import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

type State = { ids: string[] };

const initialState: State = { ids: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setAll(state, action: PayloadAction<string[]>) {
  
      state.ids = Array.from(new Set(action.payload));
    },
    toggle(state, action: PayloadAction<string>) {
      const id = action.payload;
      const i = state.ids.indexOf(id);
      if (i === -1) state.ids.push(id);
      else state.ids.splice(i, 1);
    },
    clear(state) {
      state.ids = [];
    },
  },
});

export const { setAll, toggle, clear } = favoritesSlice.actions;


export const selectFavoritesCount = (s: RootState) => s.favorites.ids.length;
export const selectIsFavorite =
  (isbn: string) =>
  (s: RootState) =>
    s.favorites.ids.includes(isbn);

export default favoritesSlice.reducer;

