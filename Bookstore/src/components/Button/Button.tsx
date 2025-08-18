import styles from "./Button.module.scss";
import type { ButtonProps } from "../../types/TButton";

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) => {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};
