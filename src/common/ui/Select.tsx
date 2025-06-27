import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  options: Option[];
  variant?: "default" | "outlined" | "filled";
  selectSize?: "small" | "medium" | "large";
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      variant = "default",
      selectSize = "medium",
      className,
      ...props
    },
    ref
  ) => {
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

    const selectClasses = clsx(
      "flex items-center rounded-xl border transition-all focus-within:ring-2 w-full",
      sizeClasses[selectSize as keyof typeof sizeClasses],
      variantClasses[variant],
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-white mb-1 ml-1">{label}</label>
        )}
        <select ref={ref} className={selectClasses} {...props}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
