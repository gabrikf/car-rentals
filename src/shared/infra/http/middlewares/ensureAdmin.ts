import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userRepository = new UserRepository();
  const { id } = request.user;
  const user = await userRepository.findById(id);
  if (!user.isAdmin) {
    throw new AppError('This user is not an admin');
  }
  return next();
}
