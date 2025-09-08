import { Link } from "react-router-dom";
import styles from "./CartPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart, selectCartSubtotal} from "../../redux/slices/cartSlice";


export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items); 
  const subtotal = useAppSelector(selectCartSubtotal);    
  const isEmpty = items.length === 0


  return (
  
    <div className="container">
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Cart</h2>

         {!isEmpty && (
           <button
            className={styles.clearBtn}
            onClick={() => dispatch(clearCart())}
            >
            Clear all
          </button>
          )}
        </div>
        {isEmpty ? (
        <div className={styles.empty}>
       <p className={styles.emptyText}>Your cart is empty.</p>
        <Link to="/" className={styles.backLink}>
            Go to catalog →
        </Link>
          </div>
        ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
           {items.map(({ book, quantity }) => (
            <div key={book.isbn13} className={styles.card}>
            <Link to={`/book/${book.isbn13}`} className={styles.coverLink}>
               <img
               src={book.image}
               alt={book.title}
               className={styles.cover}
               loading="lazy"
                />
            </Link>

            <div className={styles.info}>
              <Link
                to={`/book/${book.isbn13}`}
                className={styles.name}
                title={book.title}
              >
              {book.title}
              </Link>

            <div className={styles.meta}>
            <span className={styles.qty}>×{quantity}</span>
             <span className={styles.price}>{book.price}</span>
              </div>
             </div>
            </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Items</span>
                <span>{items.reduce((s, it) => s + it.quantity, 0)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

           <div className={styles.actions}>
              <Link to="/" className={styles.secondaryLink}>
                ← Continue shopping
              </Link>

             <button className={styles.primary} disabled> Checkout 
             </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};