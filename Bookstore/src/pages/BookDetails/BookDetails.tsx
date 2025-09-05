import styles from './BookDetails.module.scss'
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearDetails } from '../../redux/slices/booksSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import type { BookListItem } from '../../types/TBook';
import { useEffect } from 'react';
import { fetchBook } from '../../redux/thunks/booksThunk';
import { Header } from '../../components/Header/Header';

export const BookDetails = () => {
    const {isbn13} = useParams<{isbn13: string}>();
    const dispatch = useAppDispatch();
    const {item, status, error} = useAppSelector((s)=> s.books.details);

    useEffect(()=> {
        if (isbn13)dispatch(fetchBook(isbn13));
        return () => {dispatch (clearDetails()); };
    }, [dispatch, isbn13]);

    if (status === "loading" || !item) {
        return (
           <main className={styles.page}>
             <Header placeholder="Search" />
                <div className={styles.container}>
                    <div className={styles.loaderRow}>
                     {status === "loading" ? "Loading…" : error || "No data"}
                    </div>
                </div>
            </main> 
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
        <div className={styles.container}>
            <Header placeholder="Search" />
            <div className={styles.detailsContainer}>
               <div className={styles.topRow}>
                <Link to="/" className={styles.back}>
                <span className={styles.backArrow}>‹</span> Book Details
                </Link>
               </div>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    <div className={styles.bookCover}>
                        <img className={styles.cover} src={item.image} alt={item.title}/>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <h1 className={styles.bookTitle}>{item.title}</h1>
                    {item.author && (
                        <div className={styles.author}>{item.author}</div>
                    )}
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
        </div>
    )
}