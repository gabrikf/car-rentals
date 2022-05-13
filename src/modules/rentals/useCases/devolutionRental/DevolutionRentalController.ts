import { Request, Response } from 'express';

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}
