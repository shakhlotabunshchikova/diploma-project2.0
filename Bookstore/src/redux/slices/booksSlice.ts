import { createSlice } from "@reduxjs/toolkit";
import type { BookListItem } from "../../types/TBook";
import { fetchNew, searchBooks } from "../thunks/booksThunk";

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
};  

const initialState: State = {
    newReleases: { items:[], status: "idle"},
    search:{query:"", page:1, total:0, results:[], status:"idle"}
};


const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearSearch(state) {
            state.search = {query: "", page:1, total:0, results:[], status: "idle"};
        },
    },
    extraReducers: (builder) => {
        // New release books :)
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
        // search
        builder
        .addCase(searchBooks.pending,(state)=> {
            state.search.status= "loading";
            state.search.error = undefined;
        })
        .addCase(searchBooks.fulfilled, (state, action)=> {
            state.search.status= "succeeded";
            state.search.results = action.payload.books;
            state.search.page = action.payload.page;
            state.search.total = action.payload.total;
            state.search.query = action.payload.query;
        })
        .addCase(searchBooks.rejected, (state, action)=>{
            state.search.status = "failed";
            state.search.results = [];
            state.search.total = 0;
            state.search.error = String(action.error.message || "Error");
        });
    },

});
 export const { clearSearch } = booksSlice.actions;
export default booksSlice.reducer;