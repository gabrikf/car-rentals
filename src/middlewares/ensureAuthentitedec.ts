import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/implementations/UserRepository';

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
      '74EBC35C58A5049F0F271EBF6F78CC8F',
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
