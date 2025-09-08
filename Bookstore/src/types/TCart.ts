import type { BookListItem } from "./TBook";

export interface CartItem {
  book: BookListItem;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQty: number; 
}
