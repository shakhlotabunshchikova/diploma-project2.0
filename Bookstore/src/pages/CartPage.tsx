import { Link } from "react-router-dom";
import styles from "./CartPage.module.scss";  // оставляем один css-module
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearCart } from "../redux/slices/cartSlice";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  return (
    <div className={styles.page}>
      <div className={styles.cartWrap}>
        <h2 className={styles.cartTitle}>Cart</h2>
        <button
          className={styles.clearBtn}
          onClick={() => dispatch(clearCart())}
        >
          Clear All
        </button>
      </div>

      <div className={styles.cartGrid}>
        {items.map(({ book }) => (
          <div key={book.isbn13} className={styles.bookCard}>
            <Link to={`/book/${book.isbn13}`} className={styles.coverLink}>
              <img src={book.image} alt={book.title} className={styles.cover} />
            </Link>
            <div className={styles.info}>
              <Link to={`/book/${book.isbn13}`} className={styles.name}>
                {book.title}
              </Link>
              <div className={styles.price}>{book.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
