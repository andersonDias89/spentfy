import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  showTogglePassword?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      type = "text",
      showTogglePassword = false,
      className,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType =
      isPassword && showTogglePassword
        ? showPassword
          ? "text"
          : "password"
        : type;

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
            type={inputType}
            className="bg-transparent outline-none w-full placeholder:text-gray-500 text-sm"
            {...props}
          />
          {isPassword && showTogglePassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
