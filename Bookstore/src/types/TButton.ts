import type { ReactNode, ButtonHTMLAttributes } from "react";

export type Variant = "primary" | "ghost" | "danger";
export type Size = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}