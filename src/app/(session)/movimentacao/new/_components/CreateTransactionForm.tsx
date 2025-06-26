"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { createTransaction } from "@/app/(session)/movimentacao/new/_actions/create-transaction";
import { transactionSchema } from "../_schema/create-transaction-schema";

type CreateTransactionFormData = z.infer<typeof transactionSchema>;

interface CreateTransactionFormProps {
  userId: string;
  onSuccess?: () => void;
}

export default function CreateTransactionForm({
  userId,
  onSuccess,
}: CreateTransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      type: "INCOME",
      date: "",
      userId,
    },
  });

  const [error, setError] = useState("");

  async function onSubmit(data: CreateTransactionFormData) {
    setError("");

    const result = await createTransaction(data);

    if (!result.success) {
      setError(result.message ?? "Erro ao salvar transação.");
      return;
    }

    reset({ ...data, userId });
    onSuccess?.();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-800 p-4 rounded space-y-4 text-white"
    >
      <div>
        <label className="block text-sm mb-1">Título</label>
        <input
          type="text"
          {...register("title")}
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
        />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Valor</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
        />
        {errors.amount && (
          <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Categoria</label>
        <input
          type="text"
          {...register("category")}
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
        />
        {errors.category && (
          <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Tipo</label>
        <select
          {...register("type")}
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
        >
          <option value="">Selecione</option>
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>
        {errors.type && (
          <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Data</label>
        <input
          type="date"
          {...register("date")}
          className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
        />
        {errors.date && (
          <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold"
      >
        {isSubmitting ? "Salvando..." : "Criar Movimentação"}
      </button>
    </form>
  );
}
