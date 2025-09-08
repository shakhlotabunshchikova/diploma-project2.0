import { createSlice } from "@reduxjs/toolkit";
import type { BookDetails, BookListItem } from "../../types/TBook";
import { fetchBook, fetchNew, searchBooks } from "../thunks/booksThunk";

type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

type State = {
    newReleases:{
        items: BookListItem[];
        status: AsyncStatus;
        error?: string;
    };
    search:{
        query:string;
        page: number;
        total: number;
        results: BookListItem[];
        status: AsyncStatus;
        error?: string;
    };
    details: {
        item:BookDetails | null;
        status: AsyncStatus;
        error?: string
    };
};  

const initialState: State = {
    newReleases: { items:[], status: "idle"},
    search:{query:"", page:1, total:0, results:[], status:"idle"},
    details: { item: null, status: "idle"},
};


const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearSearch(state) {
            state.search = {query: "", page:1, total:0, results:[], status: "idle"};
        },
        clearDetails(state){
            state.details = { item: null, status:"idle"};
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(fetchNew.pending, (state)=> {
            state.newReleases.status = "loading";
            state.newReleases.error = undefined;
        })
        .addCase(fetchNew.fulfilled, (state, action)=>{
            state.newReleases.status = 'succeeded';
            state.newReleases.items = action.payload;
        })
        .addCase(fetchNew.rejected, (state, action)=> {
            state.newReleases.status = 'failed';
            state.newReleases.items=[]
            state.newReleases.error = String(action.error.message || "Error");
        });
    

      builder
        .addCase(searchBooks.pending, (state, action) => {
            state.search.status = "loading";
            state.search.error = undefined;

            if (action.meta?.arg?.page === 1 || !action.meta?.arg?.page) {
                state.search.results = [];
                state.search.total = 0;
                state.search.page = 1;
                state.search.query = action.meta.arg.query;
            }
        })
        .addCase(searchBooks.fulfilled, (state, action) => {
            const { books, page, total, query } = action.payload;

            state.search.status = "succeeded";
            state.search.page = page;
            state.search.total = total;
            state.search.query = query;

            if (page > 1) {
            state.search.results = [...state.search.results, ...books];
            } else {
                state.search.results = books;
            }
        })

       .addCase(searchBooks.rejected, (state, action) => {
            state.search.status = "failed";
            state.search.results = [];
            state.search.total = 0;
            state.search.error = String(action.error.message || "Error");
        });

        builder
        .addCase(fetchBook.pending, (state) => {
            state.details.status = "loading";
            state.details.error = undefined;
        })
        .addCase(fetchBook.fulfilled, (state, action) =>{
            state.details.status = "succeeded";
            state.details.item = action.payload;
        })
        .addCase(fetchBook.rejected, (state,action) => {
            state.details.status = "failed";
            state.details.item = null;
            state.details.error = String(action.error.message || "Error");
        });
    },

});
 export const { clearSearch, clearDetails } = booksSlice.actions;
export default booksSlice.reducer;