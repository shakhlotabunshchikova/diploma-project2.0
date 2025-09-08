import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectFavoritesCount } from "../../redux/slices/favoritesSlice";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import styles from "./FavoriteButton.module.scss";

export const FavoritesButton = ({ className }: { className?: string }) => {
  const count = useAppSelector(selectFavoritesCount);

  return (
    
    <Link to="/favorites" className={`${styles.favBtn} ${className ?? ""}`}
    >
      <HeartIcon className={styles.icon} filled={count > 0} />
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
};
