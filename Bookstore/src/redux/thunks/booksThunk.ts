import { createAsyncThunk } from "@reduxjs/toolkit";
import { type BookDetails, type BookListItem } from "../../types/TBook";
import type { SearchResponse } from "../../types/TApi";
import { api } from "../../axios/axios";
import type { NewResponse } from "../../types/TApi";

export const fetchNew = createAsyncThunk<BookListItem[]>(
    "books/fetchNew",
    async () => {
        const {data} = await api.get<NewResponse> ("/new");
        return data.books;
    }
)

export const searchBooks = createAsyncThunk<
{books: BookListItem[]; page:number; total: number; query: string }, 
{query: string; page?: number} 
 >("books/serachBoooks", async ({ query, page = 1}) => {
    const {data} = await api.get<SearchResponse>(
    `/search/${encodeURIComponent(query)}/${page}`
    );
     return {
    books: data.books,
    page: Number(data.page),
    total:Number (data.total),
    query,
 };
 });

 export const fetchBook = createAsyncThunk<BookDetails, string>(
    "books/fetchBook",
    async (isbn13) => {
        const { data } = await api.get(`/books/${isbn13}`);
        return data as BookDetails;
    }
 );


