import { createAsyncThunk } from "@reduxjs/toolkit";
import { type BookDetails, type BookListItem } from "../../types/TBook";
import type { SearchResponse } from "../../types/TApi";
import { api } from "../../axios/axios";
import type { NewResponse } from "../../types/TApi";

export const fetchNew = createAsyncThunk<BookListItem[]>(
    "books/fetchNew",
    async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<NewResponse>("/new");
      return data.books;
    } catch (err: any) {
      return rejectWithValue(err?.message ?? "Failed to fetch new releases");
    }
  }
);
export const searchBooks = createAsyncThunk<
{books: BookListItem[]; page:number; total: number; query: string }, 
{query: string; page?: number},
 { rejectValue: string } 
 >("books/searchBoooks", 
    async ({ query, page = 1}, { rejectWithValue, signal }) => {
     try {
      const { data } = await api.get<SearchResponse>(
        `/search/${encodeURIComponent(query)}/${page}`,
        { signal } 
    );
     return {
    books: data.books,
    page: Number(data.page),
    total:Number (data.total),
    query,
 };
 } catch (err: any) {
    if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
        throw err;
      }
      return rejectWithValue(err?.message ?? "Search request failed");
    }
  }
);

 export const fetchBook = createAsyncThunk<BookDetails, string, { rejectValue: string }>(
    "books/fetchBook",
    async (isbn13, { rejectWithValue, signal }) => {
        try {
      const { data } = await api.get(`/books/${isbn13}`, { signal });
      return data as BookDetails;
    } catch (err: any) {
      if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
        throw err;
      }
      return rejectWithValue(err?.message ?? "Failed to fetch book");
    }
  }
);

