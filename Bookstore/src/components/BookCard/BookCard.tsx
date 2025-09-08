import styles from './BookCard.module.scss';
import type { BookListItem } from '../../types/TBook';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';


type Props = { book: BookListItem };


export const BookCard =({book}: Props)=>{
    const dispatch = useAppDispatch();
    const qtyInCart = useAppSelector(
    (s) => s.cart.items.find(i => i.book.isbn13 === book.isbn13)?.quantity ?? 0
  );

  const handleAdd = () => {
    dispatch(addToCart(book));
  };
    return (
        <div className={styles.cardWrap}>
            <Link to={`/book/${book.isbn13}`} className={styles.coverLink}>
                <img 
                className={styles.cover} 
                src={book.image} 
                alt={`${book.title} cover`}
                />
            </Link>
            <div className={styles.bookInfo}>
                <Link 
                to={`/book/${book.isbn13}`} 
                className={styles.bookTitle}
                title={book.title}>
                {book.title}
                </Link>

            <div className={styles.ctaRow}>
                <span className={styles.bookPrice}>{book.price}</span>
              <button
                    className={`${styles.buyBtn} ${qtyInCart ? styles.added : ''}`}
                    onClick={handleAdd}
                >
                    {qtyInCart ? `In cart (${qtyInCart})` : 'Add to cart'}
                </button> 
            </div>
           </div>
        </div>
    )
}