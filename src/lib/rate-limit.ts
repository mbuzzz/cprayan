type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function consumeRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 10_000) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(bucketKey);
      }
    }
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}
