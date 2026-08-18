-- Production schema additions used by current Prisma schema.
ALTER TABLE "Order"
  ADD COLUMN IF NOT EXISTS "paymentGateway" TEXT DEFAULT 'sumopod',
  ADD COLUMN IF NOT EXISTS "paymentId" TEXT,
  ADD COLUMN IF NOT EXISTS "paymentUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "qrCodeUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "gatewayResponse" TEXT,
  ADD COLUMN IF NOT EXISTS "deliveryEmailSentAt" TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "deliveryEmailMessageId" TEXT;

ALTER TABLE "Product"
  ADD COLUMN IF NOT EXISTS "originalPrice" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "license" TEXT;

INSERT INTO "Category" ("id", "name", "slug", "description")
VALUES ('category-ai-subscription', 'AI & Subscription', 'ai-subscription', 'Produk AI, cloud storage, dan langganan digital.')
ON CONFLICT ("slug") DO NOTHING;
