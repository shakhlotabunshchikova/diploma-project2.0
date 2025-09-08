import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "../slices/booksSlice";
import cartReducer from "../slices/cartSlice";
import favoritesReducer from "../slices/favoritesSlice";
import { readCart, writeCart } from "../../utils/cartStorage";
import { readFavIds, writeFavIds } from "../../utils/favorites";


const rootReducer = combineReducers({
  books: booksReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

function preloaded(): Partial<RootState> | undefined {
  if (typeof window === "undefined") return undefined;
  const pre: Partial<RootState> = {};
  const cart = readCart();
  const favIds = readFavIds();
  if (cart) (pre as any).cart = cart;
  if (favIds.length) (pre as any).favorites = { ids: favIds };
  return Object.keys(pre).length ? pre : undefined;
}

function makeDebouncedPersist(storeRef: { getState: () => RootState }, delay = 250) {
  let tCart: number | undefined, tFav: number | undefined;
  let lastCart = "", lastFav = "";
  return {
    cart() {
      if (tCart) clearTimeout(tCart);
      tCart = window.setTimeout(() => {
        const state = storeRef.getState();
        const dump = JSON.stringify(state.cart);
        if (dump !== lastCart) { writeCart(state.cart); lastCart = dump; }
      }, delay);
    },
    favorites() {
      if (tFav) clearTimeout(tFav);
      tFav = window.setTimeout(() => {
        const ids = storeRef.getState().favorites.ids;
        const dump = JSON.stringify(ids);
        if (dump !== lastFav) { writeFavIds(ids); lastFav = dump; }
      }, delay);
    },
  };
}

const persistMiddleware = (storeAPI: any) => {
  const scribe = makeDebouncedPersist(storeAPI, 250);
  return (next: any) => (action: any) => {
    const res = next(action);
    if (action.type?.startsWith("cart/")) scribe.cart();
    if (action.type?.startsWith("favorites/")) scribe.favorites();
    return res;
  };
};

export const store = configureStore({
  reducer: rootReducer,                
  preloadedState: preloaded(),       
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
});

export type AppDispatch = typeof store.dispatch;
