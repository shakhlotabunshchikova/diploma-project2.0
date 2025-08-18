import styles from './BookCard.module.scss';
import type { BookCardProps } from '../../types/TBookCard';
import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from '../../utils/favorites';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../../assets/icons/HeartIcon';

export const BookCard =({book, onAddToCart}: BookCardProps)=>{
    const [fav, setFav]=useState(false);

    useEffect(()=>{
        setFav(isFavorite(book.isbn13));
    }, [book.isbn13]);

    const handleToggleFav =()=>{
        const updated = toggleFavorite(book.isbn13);
        setFav(updated.includes(book.isbn13));
    };
    return (
        <div className={styles.cardWrap}>
            <Link to={`/book/${book.isbn13}`} className={styles.coverLink}>
                <img className={styles.cover} src={book.image} alt={`${book.title}cover`}/>
            </Link>
            <div className={styles.bookInfo}>
                <Link to={`/book/${book.isbn13}`} className={styles.bookTitle} title={book.title}>{book.title}</Link>
                {/* {book.subtitle && <p className={styles.bookSubtitle}>{book.subtitle}</p>} */}

            <div className={styles.moreInfo}>
                <span className={styles.bookPrice}>{book.price}</span>
                <div className={styles.actions}>
                    <button className={styles.btn} onClick={()=> onAddToCart?.(book)}>Buy Now</button>
                    <button
                    className={styles.favBtn}
                    onClick={handleToggleFav}
                    aria-pressed={fav}
                    title={fav? "В избранном" : "Добавить в избранное"}>
                        <HeartIcon
                        className={`${styles.icon}${fav ? styles.iconFilled : styles.iconOutline}`} />
                    </button>
                </div>
            </div>
           </div>
        </div>
    )
}