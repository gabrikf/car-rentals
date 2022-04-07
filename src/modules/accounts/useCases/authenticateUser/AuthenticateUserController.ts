import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const { email, password } = request.body;
    const result = await authenticateUserUseCase.execute({ email, password });
    return response.json(result);
  }
}
