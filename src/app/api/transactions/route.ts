import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CacheService } from "@/lib/cache";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const useCache = searchParams.get("cache") !== "false";

    const cacheKey = CacheService.generateTransactionKey(session.user.id);

    // Tentar buscar do cache primeiro
    if (useCache) {
      const cachedTransactions = CacheService.get(cacheKey);
      if (cachedTransactions) {
        return NextResponse.json(cachedTransactions);
      }
    }

    // Se não estiver no cache, buscar do banco
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
    });

    // Salvar no cache
    if (useCache) {
      CacheService.set(cacheKey, transactions);
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const transacao = await prisma.transaction.create({
    data: {
      ...body,
      date: new Date(body.date),
    },
  });

  // Invalidar cache das transações do usuário
  if (body.userId) {
    CacheService.invalidateUserTransactions(body.userId);
  }

  return NextResponse.json(transacao);
}
