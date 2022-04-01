import { Request, Response } from 'express';

import { ListCategoryUseCase } from './ListCategoryUseCase';

export class ListCategoryController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}
  handle(request: Request, response: Response) {
    const result = this.listCategoryUseCase.execute();
    response.status(201).json(result);
  }
}
