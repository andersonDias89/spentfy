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
        "px-6 py-2 rounded-md bg-zinc-900 text-white font-medium transition-all duration-300",
        "border border-[#2e2e2e] shadow-md",
        "hover:shadow-[0_0_10px_#3b82f6]",
        "focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
