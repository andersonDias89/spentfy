"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps {
  schema: any;
  defaultValues: FieldValues;
  onSubmit: any;
  children: React.ReactNode;
}

export default function Form({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {children}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold"
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
