const rateLimitCache = new Map();

export async function rateLimit(req, options = {}) {
  const { points = 5, duration = 15 * 60 * 1000 } = options;
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
  const now = Date.now();

  // Clean up old entries
  rateLimitCache.forEach((value, key) => {
    if (now - value.timestamp > duration) {
      rateLimitCache.delete(key);
    }
  });

  const entry = rateLimitCache.get(ip) || { count: 0, timestamp: now };

  if (now - entry.timestamp > duration) {
    // Reset counter if duration has passed
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  rateLimitCache.set(ip, entry);

  if (entry.count > points) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429 }
    );
  }

  return null;
}