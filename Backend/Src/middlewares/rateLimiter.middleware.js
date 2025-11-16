const Redis = require('ioredis');
const logger = require('../utils/logger');

const redisUrl = process.env.REDIS_URL;
let redis = null;
let useInMemory = false;
const memoryStore = new Map();

if (!redisUrl || redisUrl.includes('<') || redisUrl.includes('yourpassword') || redisUrl.includes('password')) {
  useInMemory = true;
  logger.warn('REDIS_URL not set or looks like a placeholder — using in-memory rate limiter.');
} else {
  redis = new Redis(redisUrl);
  redis.on('error', (err) => {
    logger.warn('Redis connection error:', err.message || err);
  });
}

module.exports = async (req, res, next) => {
  try {
    const ip = req.ip || 'unknown';
    const key = `rate:${ip}`;
    const limit = 100;
    const ttl = 60; // seconds

    if (useInMemory) {
      const now = Date.now();
      const entry = memoryStore.get(key) || { count: 0, expiresAt: now + ttl * 1000 };
      if (now > entry.expiresAt) {
        entry.count = 0;
        entry.expiresAt = now + ttl * 1000;
      }
      entry.count += 1;
      memoryStore.set(key, entry);

      if (entry.count > limit) {
        return res.status(429).json({ success: false, message: 'Too many requests', statusCode: 429 });
      }
      return next();
    }

    let count = await redis.incr(key);
    if (count === 1) await redis.expire(key, ttl);

    if (count > limit) {
      return res.status(429).json({ success: false, message: 'Too many requests', statusCode: 429 });
    }
    next();
  } catch (err) {
    next(err);
  }
};
