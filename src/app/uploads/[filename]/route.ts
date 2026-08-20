import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".zip": "application/zip",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  // Only serve a single file name; never allow path traversal.
  if (!filename || filename !== path.basename(filename)) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filename).toLowerCase();

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
