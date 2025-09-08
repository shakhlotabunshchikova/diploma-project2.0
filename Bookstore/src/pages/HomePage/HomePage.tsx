import { useEffect, useState, useMemo } from "react";
import { BookCard } from "../../components/BookCard/BookCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./Home.module.scss";
import { fetchNew, searchBooks } from "../../redux/thunks/booksThunk";

const STEP = 8;

export const Home = () => {
  const dispatch = useAppDispatch();
  const newState = useAppSelector((s) => s.books.newReleases);
  const searchState = useAppSelector((s) => s.books.search);

  const [visible, setVisible] = useState(STEP);

  useEffect(() => {
    if (!searchState.query && newState.status === "idle") {
      dispatch(fetchNew());
    }
  }, [dispatch, searchState.query, newState.status]);

  const isSearching = Boolean(searchState.query);

  const books = useMemo(
    () => (isSearching ? searchState.results : newState.items.slice(0, visible)),
    [isSearching, searchState.results, newState.items, visible]
  );

  const canLoadMoreNew = !isSearching && visible < newState.items.length;
  const canLoadMoreSearch =
    isSearching && searchState.page * 10 < searchState.total;

  const handleLoadMore = () => {
    if (isSearching) {
      dispatch(
        searchBooks({ query: searchState.query, page: searchState.page + 1 })
      );
    } else {
      setVisible((v) => Math.min(v + STEP, newState.items.length));
    }
  };


  return (
      <div className="container">
        <div className={styles.page}>
        <h2 className={styles.homeTitle}>
          {isSearching
            ? `Results for "${searchState.query}"`
            : "Best Seller"}
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
          >Load more
          </button>
        )}
      </div>
      </div>

  );
};
