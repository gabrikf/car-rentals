import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('needs token', 401);
  }
  const [, token] = authHeaders.split(' ');

  try {
    const userRepository = new UserRepository();
    const tokenVerified = verify(
      token,
      process.env.JWT_SECRET_TOKEN,
    ) as IPayload;
    const { sub: user_id } = tokenVerified;
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exist', 401);
    }
    request.user = {
      id: user_id,
    };
    return next();
  } catch {
    throw new AppError('Invaid token', 401);
  }
}
