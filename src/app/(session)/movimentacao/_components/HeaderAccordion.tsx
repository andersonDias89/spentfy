"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import CreateTransactionForm from "../new/_components/CreateTransactionForm";

interface HeaderAccordionProps {
  userId: string;
  onSuccess: () => void;
}

export default function HeaderAccordion({
  userId,
  onSuccess,
}: HeaderAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <div
        className="flex items-center justify-between bg-gray-100 rounded-t-lg px-6 py-4 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <h2 className="text-lg font-bold text-gray-800">Nova Movimentação</h2>
        {open ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        )}
      </div>
      {open && (
        <div className="bg-white rounded-b-lg shadow-md px-6 py-4 border-t">
          <CreateTransactionForm userId={userId} onSuccess={onSuccess} />
        </div>
      )}
    </div>
  );
}
