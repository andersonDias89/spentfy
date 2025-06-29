"use client";

import React from "react";
import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
  icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "flex gap-2",
        "px-6 py-2 rounded-md bg-green-500 text-bold text-black font-medium transition-all duration-300",
        "hover:bg-green-600 focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
