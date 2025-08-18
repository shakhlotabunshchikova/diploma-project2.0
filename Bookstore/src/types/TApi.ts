import type { BookListItem } from "./TBook";

export interface SearchResponse {
 total: string;
 page: string;
 books:BookListItem[];
}

export interface NewResponse {
  total: string;
  books: BookListItem[];

}
