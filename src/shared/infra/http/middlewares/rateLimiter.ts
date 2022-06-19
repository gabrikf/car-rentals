import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as redis from 'redis';

import { AppError } from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  nextFunction: NextFunction,
): Promise<void> {
  const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });
  await redisClient.connect();

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 10, // 10 requests
    duration: 5, // per 5 second by IP
  });
  try {
    await limiter.consume(request.ip);

    return nextFunction();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
