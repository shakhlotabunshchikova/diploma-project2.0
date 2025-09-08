import styles from "./Button.module.scss";
import type { ButtonProps } from "../../types/TButton";

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const root = [styles.btnRoot, styles[variant], className].filter(Boolean).join(" ");
  return (
    <button type="button" className={root} {...props}/>
  );
};
