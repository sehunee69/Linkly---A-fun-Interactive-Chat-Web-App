import Redis from "ioredis"
import { env } from "./env.js"

const { REDIS_URL } = env();

export const redis = new Redis(REDIS_URL, {
    retryStrategy: () => null,
    maxRetriesPerRequest: null,
    lazyConnect: true,
    enableOfflineQueue: true,
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message)
})