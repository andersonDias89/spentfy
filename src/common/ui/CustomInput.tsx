import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, icon, className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-gray-400 mb-1 ml-1">
            {label}
          </label>
        )}
        <div
          className={clsx(
            "flex items-center px-4 py-3 rounded-xl border transition-all",
            "bg-[#1e1e2f] text-white focus-within:ring-2",
            error
              ? "border-red-400 focus-within:ring-red-500"
              : "border-gray-600 focus-within:ring-blue-500",
            className
          )}
        >
          {icon && <div className="mr-3 text-gray-400">{icon}</div>}
          <input
            ref={ref}
            className="bg-transparent outline-none w-full placeholder:text-gray-500 text-sm"
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
