import { useState } from "react";
import { Link } from "react-router-dom";
import type { THeader } from "../../types/THeader";
import styles from "./Header.module.scss";
import { HeartIcon } from "../../assets/icons/HeartIcon";

import { Logo } from "../../assets/icons/Logo";
import { CartButton } from "../CartButton/CartButton";

export const Header = ({ placeholder, onSearch }: THeader) => {
  const [value, setValue] = useState("");
  const [inputState, setInputState] = useState<"default" | "focus" | "active">("default");

  const getInputClass = () => {
    switch (inputState) {
      case "focus": return styles.inputFocus;
      case "active": return styles.inputActive;
      default: return styles.inputDefault;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    onSearch?.(q); 
  };

  return (
    <header className={styles.header}>
    <div className={styles.container}>
      <Link to="/" className={styles.logo}><Logo /></Link>

      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input
          className={getInputClass()}
          placeholder={placeholder ?? "Search for books..."}
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
      <Link to="/favorites" className={styles.icon}>
        <HeartIcon />
      </Link>
       <CartButton/>
     </div>
     </div>
    </header>
  );
};

