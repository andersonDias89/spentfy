"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
  const [showToast, setShowToast] = useState(false);

  async function onSubmit(data: CreateTransactionFormData) {
    setError("");

    const result = await createTransaction(data);

    if (!result.success) {
      setError(result.message ?? "Erro ao salvar transação.");
      return;
    }

    reset({ ...data, userId });
    onSuccess?.();
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      router.push("/movimentacao");
    }, 2000);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="relative">
        {/* Toast no topo da tela */}
        {showToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 animate-slideDown">
            Movimentação criada com sucesso!
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-800 p-4 rounded space-y-4 text-white relative"
        >
          <div>
            <label className="block text-sm mb-1">Título</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.title.message}
              </p>
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
              <p className="text-red-400 text-xs mt-1">
                {errors.amount.message}
              </p>
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
              <p className="text-red-400 text-xs mt-1">
                {errors.category.message}
              </p>
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
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
          >
            {isSubmitting && <LoadingSpinner size={4} />}{" "}
            {isSubmitting ? "Salvando..." : "Criar Movimentação"}
          </button>
        </form>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 animate-slideDown">
          Movimentação criada com sucesso!
        </div>
      )}
    </Suspense>
  );
}

// Spinner component simples
function LoadingSpinner({ size = 6 }: { size?: number }) {
  return (
    <div
      className={`h-${size} w-${size} border-2 border-t-transparent border-white rounded-full animate-spin`}
    ></div>
  );
}
