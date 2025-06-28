import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Buscar sempre dados frescos do banco - sem cache do servidor
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
    });

    // Converter Decimal para number para serialização
    const serializedTransactions = transactions.map(transaction => ({
      ...transaction,
      amount: Number(transaction.amount), // Converter Decimal para number
    }));

    // Adicionar headers para evitar cache do browser
    const response = NextResponse.json(serializedTransactions);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("[POST] Recebendo requisição para criar transação");
  const body = await req.json();
  console.log("[POST] Body recebido:", body);

  const transacao = await prisma.transaction.create({
    data: {
      ...body,
      date: new Date(body.date),
    },
  });
  console.log("[POST] Transação criada:", transacao);

  // Converter Decimal para number para serialização
  const serializedTransaction = {
    ...transacao,
    amount: Number(transacao.amount), // Converter Decimal para number
  };

  // Retornar com headers para evitar cache
  const response = NextResponse.json(serializedTransaction);
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
