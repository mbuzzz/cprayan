import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  // Digital Products & Documents
  "application/zip",
  "application/x-zip-compressed",
  "application/x-zip",
  "application/pdf",
  "application/gzip",
  "application/x-tar",
]);

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce Admin Authorization
    if (!await requireAdmin()) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // 3. Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Tipe berkas tidak didukung: ${file.type}. Format yang didukung: JPG, PNG, WEBP, SVG, GIF, PDF, ZIP.` },
        { status: 400 }
      );
    }

    // 4. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Ukuran berkas melebihi batas maksimal 50MB.` },
        { status: 400 }
      );
    }

    // 5. Generate Safe Unique Filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name).toLowerCase() || getExtensionFromMime(file.type);
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.[^/.]+$/, "")
      .slice(0, 30);
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}-${uniqueId}-${sanitizedName}${ext}`;

    // 6. Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // 7. Write file to disk
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file." }, { status: 500 });
  }
}

function getExtensionFromMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    case "image/gif":
      return ".gif";
    case "application/pdf":
      return ".pdf";
    case "application/zip":
    case "application/x-zip-compressed":
      return ".zip";
    default:
      return ".bin";
  }
}
