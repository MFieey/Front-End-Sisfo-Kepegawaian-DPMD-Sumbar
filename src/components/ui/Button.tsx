import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;

  href?: string;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  type?: "button" | "submit" | "reset";

  disabled?: boolean;

  variant?:
    | "primary"
    | "secondary"
    | "warning"
    | "danger";
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}: Props) {

  const styles = {
    primary:
      "bg-green-700 hover:bg-green-800",

    secondary:
      "bg-blue-600 hover:bg-blue-700",

    warning:
      "bg-amber-500 hover:bg-amber-600",

    danger:
      "bg-red-600 hover:bg-red-700",
  };

  const className = `
    px-5
    py-2.5
    rounded-xl
    font-semibold
    text-white
    shadow-md
    hover:shadow-lg
    hover:-translate-y-0.5
    transition-all
    duration-300
    flex
    items-center
    justify-center
    gap-2
    ${styles[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

  if (href) {
    return (
      <Link
        href={href}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}