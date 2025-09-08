import styles from './BookDetails.module.scss'
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearDetails } from '../../redux/slices/booksSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import type { BookListItem } from '../../types/TBook';
import { useEffect } from 'react';
import { fetchBook } from '../../redux/thunks/booksThunk';
import { toggle as toggleFavorite } from '../../redux/slices/favoritesSlice';
import { HeartIcon } from '../../assets/icons/HeartIcon';
import { BackArrowIcon } from '../../assets/icons/BackArrow';

export const BookDetails = () => {
    const {isbn13} = useParams();
    const dispatch = useAppDispatch();
    const {item, status, error} = useAppSelector((s)=> s.books.details);

    
    const fav = useAppSelector(s =>
    isbn13 ? s.favorites.ids.includes(isbn13) : false
  );

    useEffect(()=> {
        if (isbn13)dispatch(fetchBook(isbn13));
        return () => {dispatch (clearDetails()); };
    }, [dispatch, isbn13]);

     const handleToggleFav = () => {
    if (!isbn13) return;
    dispatch(toggleFavorite(isbn13));
  };


    if (status === "loading" || !item) {
        return (
           <div className="container">
                <div className={styles.loaderRow}>
                {status === "loading" ? "Loading…" : error || "No data"}
                </div>
            </div>
        );
    }

    const cartItem: BookListItem = {
    title: item.title,
    subtitle: item.subtitle,
    isbn13: item.isbn13,
    price: item.price,
    image: item.image,
    url: item.url,
  };

    return (
        <div className='container'>
               <div className={styles.topRow}>
              <Link to="/" className={styles.back}>
            <BackArrowIcon aria-hidden="true" />
            <span>Book Details</span>
            </Link>
               </div>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    <div className={styles.bookCover}>
                        <button
                    type="button"
                    className={styles.favBtnMobile}
                    onClick={handleToggleFav}
                    aria-pressed={fav}
                    title={fav ? "В избранном" : "Добавить в избранное"}
                >
                    <HeartIcon className={styles.icon} filled={fav} size={28} />
                </button>
                        <img className={styles.cover} src={item.image} alt={item.title}/>
                    </div>
                </div>
                <div className={styles.rightSide}>
                     <div className={styles.headerRow}>
              <div className={styles.titles}>
                    <h1 className={styles.bookTitle}>{item.title}</h1>
                    {item.authors && <div className={styles.author}>{item.authors}</div>}
                </div>

                <button
                    type="button"
                    className={styles.favBtn}
                    onClick={handleToggleFav}
                    aria-pressed={fav}
                    title={fav ? "В избранном" : "Добавить в избранное"}
                >
                    <HeartIcon className={styles.icon} filled={fav} size={28} />
                </button>
                </div>

                    <h3 className={styles.subhead}>Summary</h3>
                    {item.desc ? (
                        <p className={styles.summary}>{item.desc}</p>) : (
                            <p className={styles.noDesc}>No description</p>
                    )}
                </div>
            </div>

            <div className={styles.bottomBar}>
                <button
                    className={styles.buyBtn}
                    onClick={() => dispatch(addToCart(cartItem))}
                    aria-label={`Buy ${item.title} for ${item.price}`}
                >
                    <span className={styles.buyPrice}>{item.price}</span>
                    <span className={styles.buyLabel}>Buy Now</span>
                </button>
            </div>
        </div>
    )
}