import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PIN = "244345";
const STATE_ID = "mlbbstemda-2026";

export async function GET() {
  const record = await prisma.mlbbTournament.findUnique({ where: { id: STATE_ID } });
  return NextResponse.json(record ? JSON.parse(record.state) : { matches: [], rounds: [] });
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || body.pin !== PIN || !body.state) {
    return NextResponse.json({ error: "PIN tidak valid" }, { status: 401 });
  }
  const saved = await prisma.mlbbTournament.upsert({
    where: { id: STATE_ID },
    create: { id: STATE_ID, state: JSON.stringify(body.state) },
    update: { state: JSON.stringify(body.state) },
  });
  return NextResponse.json(JSON.parse(saved.state));
}
