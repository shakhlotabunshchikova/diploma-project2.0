import { Link } from "react-router-dom";
import styles from "./CartButton.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCartCount } from "../../redux/slices/cartSlice";
import { Cart } from "../../assets/icons/Cart";

type Props = { className?: string };

export const CartButton = ({ className }: Props) => {
  const count = useAppSelector(selectCartCount);
  const rootClass = [styles.cartBtn, className].filter(Boolean).join(" ");

  return (
    <Link to="/cart" className={rootClass} aria-label="Open cart">
      <Cart className={styles.icon}/>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
};
