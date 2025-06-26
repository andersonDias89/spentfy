// components/ui/Toast.tsx
"use client";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error"; // para cores futuras, se quiser
}

export function Toast({ show, message, type = "success" }: ToastProps) {
  if (!show) return null;

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-zinc-800";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-2 rounded shadow-lg z-50 animate-slideDown`}
    >
      {message}
    </div>
  );
}
