import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationCarUseCase } from './CreateSpecificationCarUseCase';

export class CreateSpecificationCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationCarUseCase,
    );
    const { id } = request.params;
    const { specifications_ids } = request.body;
    const car = await createSpecificationUseCase.execute({
      car_id: id,
      specifications_ids,
    });
    return response.json(car);
  }
}
