"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useCreateTransaction } from "@/hooks/useTransactions";
import { transactionSchema } from "../_schema/create-transaction-schema";
import { Toast } from "@/common/ui/Toast";
import { Input } from "@/common/ui/Input";
import { Select } from "@/common/ui/Select";
import { DateSelect } from "@/common/ui/SelectDate";

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
  const { createTransactionWithCache } = useCreateTransaction();
  console.log(
    "[CreateTransactionForm] Componente montado. userId recebido:",
    userId
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: undefined,
      type: "INCOME",
      date: "",
      userId,
    },
  });

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function onSubmit(data: CreateTransactionFormData) {
    setError("");

    // O hook já faz o optimistic update e invalidação do cache
    const result = await createTransactionWithCache(data);

    if (!result.success) {
      setError(result.message ?? "Erro ao salvar transação.");
      return;
    }

    // Reset do formulário
    reset({ ...data, userId });

    // Chama onSuccess para fechar o accordion ou fazer outras ações de UI
    onSuccess?.();

    // Toast de sucesso
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      router.push("/movimentacao");
    }, 2000);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="">
        <Toast show={showToast} message="Movimentação criada com sucesso!" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-150 rounded-md space-y-4 text-white grid grid-cols-2 gap-3"
        >
          <Input
            label="Descrição"
            placeholder="Descrição"
            type="text"
            {...register("title")}
            error={errors.title?.message}
          />

          <Input
            label="Valor"
            type="number"
            placeholder="Digite o valor"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <Select
            label="Tipo"
            {...register("type")}
            options={[
              { value: "", label: "Selecione" },
              { value: "INCOME", label: "Entrada" },
              { value: "EXPENSE", label: "Saída" },
            ]}
            error={errors.type?.message}
          />

          <DateSelect
            label="Data"
            {...register("date")}
            error={errors.date?.message}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="grid col-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 w-52 px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
            >
              {isSubmitting && <LoadingSpinner size={4} />}{" "}
              {isSubmitting ? "Salvando..." : "Criar Movimentação"}
            </button>
          </div>
        </form>
      </div>
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
