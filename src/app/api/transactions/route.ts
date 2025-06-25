import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const transacao = await prisma.transaction.create({
    data: {
      ...body,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(transacao);
}
