import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  showTogglePassword?: boolean;
  error?: string;
  variant?: "default" | "outlined" | "filled";
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      type = "text",
      showTogglePassword = false,
      size = "medium",
      variant = "default",
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

    const sizeClasses = {
      small: "px-2 py-1 text-xs",
      medium: "px-4 py-3 text-sm",
      large: "px-6 py-4 text-base",
    };

    const variantClasses = {
      default: "bg-zinc-900 border-gray-600 focus-within:ring-blue-500",
      outlined: "bg-transparent border-gray-600 focus-within:ring-blue-500",
      filled: "bg-gray-700 border-gray-600 focus-within:ring-blue-500",
    };

    const inputClasses = clsx(
      "flex items-center rounded-xl border transition-all focus-within:ring-2",
      sizeClasses[size as keyof typeof sizeClasses],
      variantClasses[variant],
      className
    );

    return (
      <div className="w-full">
        <div className="w-full">
          {label && (
            <label className="block text-sm text-white mb-1 ml-1">
              {label}
            </label>
          )}
          <div className={inputClasses}>
            {icon && <div className="mr-3 text-gray-400">{icon}</div>}
            <input
              ref={ref}
              type={inputType}
              className="bg-transparent outline-none w-full placeholder:text-zinc-700"
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
            <span className="text-xs text-red-400 mt-1 ml-1 block">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
