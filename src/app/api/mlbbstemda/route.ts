import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const STATE_ID = "mlbbstemda-2026";

export async function GET() {
  const record = await prisma.mlbbTournament.findUnique({ where: { id: STATE_ID } });
  return NextResponse.json(record ? JSON.parse(record.state) : { matches: [], rounds: [] });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string } | undefined)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || !body.state) {
    return NextResponse.json({ error: "State tidak valid" }, { status: 400 });
  }
  const saved = await prisma.mlbbTournament.upsert({
    where: { id: STATE_ID },
    create: { id: STATE_ID, state: JSON.stringify(body.state) },
    update: { state: JSON.stringify(body.state) },
  });
  return NextResponse.json(JSON.parse(saved.state));
}
