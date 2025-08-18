import { Link } from "react-router-dom";
import styles from "./CartButton.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCartCount } from "../../redux/slices/cartSlice";
import { Cart } from "../../assets/icons/cart";

export const CartButton = () => {
  const count = useAppSelector(selectCartCount);

  return (
    <Link to="/cart" className={styles.btn}>
      <Cart/>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
};
