import type { SVGProps } from "react";

interface BackArrowIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const BackArrowIcon = ({
  size = 24,
  strokeWidth = 2,
  ...rest
}: BackArrowIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
