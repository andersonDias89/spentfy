import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Calendar } from "lucide-react";

interface DateSelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  variant?: "default" | "outlined" | "filled";
  selectSize?: "small" | "medium" | "large";
  className?: string;
}

export const DateSelect = forwardRef<HTMLInputElement, DateSelectProps>(
  (
    {
      label,
      error,
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

    const inputClasses = clsx(
      "flex items-center rounded-xl border transition-all focus-within:ring-2 cursor-pointer",
      sizeClasses[selectSize as keyof typeof sizeClasses],
      variantClasses[variant],
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-white mb-1 ml-1">{label}</label>
        )}
        <div
          className={inputClasses}
          tabIndex={0}
          onClick={(e) => {
            // Foca no input ao clicar em qualquer parte do container
            const input = e.currentTarget.querySelector(
              "input"
            ) as HTMLInputElement;
            input?.focus();
            input?.showPicker?.(); // Para navegadores que suportam showPicker()
          }}
        >
          <input
            ref={ref}
            type="date"
            className="bg-transparent outline-none w-full placeholder:text-zinc-700 cursor-pointer hide-date-icon"
            {...props}
            // Removido o onFocus que chamava showPicker para evitar erro
          />
          <Calendar
            className="ml-2 text-gray-400 pointer-events-none"
            size={18}
          />
        </div>
        {error && (
          <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
        )}
      </div>
    );
  }
);

DateSelect.displayName;
