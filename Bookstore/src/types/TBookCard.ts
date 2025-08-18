import type { BookListItem } from "./TBook";

export interface BookCardProps{
    book: BookListItem;
    onAddToCart?: (book: BookListItem) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (isbn13:string)=>void;
}