import { useEffect, useState, useMemo } from "react";
import { BookCard } from "../components/BookCard/BookCard";
import { Header } from "../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "./Home.module.scss";
import { fetchNew, searchBooks } from "../redux/thunks/booksThunk";


const STEP = 8;

export const Home = () => {
  const dispatch = useAppDispatch();
  const newState = useAppSelector((s) => s.books.newReleases);
  const searchState = useAppSelector((s) => s.books.search);

  
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(STEP);

  
  useEffect(() => {
    if (!query && newState.status === "idle") {
      dispatch(fetchNew());
    }
  }, [dispatch, query, newState.status]);

  
  useEffect(() => {
    if (query) {
      dispatch(searchBooks({ query, page }));
    }
  }, [dispatch, query, page]);

  
  const books = useMemo(
    () => (query ? searchState.results : newState.items.slice(0, visible)),
    [query, searchState.results, newState.items, visible]
  );

  
  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    setQuery(trimmed);
    setPage(1);
    setVisible(STEP);

  };


  const canLoadMoreNew = !query && visible < newState.items.length;
  const canLoadMoreSearch = query && page * 10 < searchState.total;

  const handleLoadMore = () => {
    if (query) {
      setPage((p) => p + 1); 
    } else {
      setVisible((v) => Math.min(v + STEP, newState.items.length)); 
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Header placeholder="Search" onSearch={handleSearch} />

      <div className={styles.homeWrap}>
        <h2 className={styles.homeTitle}>
          {query ? `Results for "${query}"` : "Best Seller"}
        </h2>

        <div className={styles.bookGrid}>
          {books.map((book) => (
            <BookCard key={book.isbn13} book={book} />
          ))}
        </div>

        {(canLoadMoreNew || canLoadMoreSearch) && (
          <button
            className={styles.loadMore}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};
