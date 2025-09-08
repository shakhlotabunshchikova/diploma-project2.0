import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { Logo } from "../../assets/icons/Logo";
import { CartButton } from "../CartButton/CartButton";
import { FavoritesButton } from "../FavoriteButton/FavoriteButton";
import { useAppDispatch } from "../../redux/hooks";
import { searchBooks, fetchNew } from "../../redux/thunks/booksThunk"; 

export const Header = () => {
   const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [inputState, setInputState] =
    useState<"default" | "focus" | "active">("default");

  const getInputClass = () => {
    switch (inputState) {
      case "focus": return styles.inputFocus;
      case "active": return styles.inputActive;
      default: return styles.inputDefault;
    }
  };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed) {
          dispatch(searchBooks({ query: trimmed, page: 1 }));
        } else {
          dispatch(fetchNew()); 
        }
      };
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>

        <form onSubmit={onSubmit} className={styles.searchForm}>
          <input
            className={getInputClass()}
            placeholder= "Search for books..."
            value={value}
            onFocus={() => setInputState("focus")}
            onChange={(e) => {
              const v = e.target.value;
              setValue(v);
              setInputState(v ? "active" : "default");
            }}
          />
        </form>

        <div className={styles.iconContainer}>
          <FavoritesButton className={styles.icon} />
          <CartButton className={styles.icon} />
        </div>
      </div>
    </header>
  );
};

