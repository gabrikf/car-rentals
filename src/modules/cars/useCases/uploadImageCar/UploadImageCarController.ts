import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadImageCarUseCase } from './UploadImageCarUseCase';

interface IFile {
  filename: string;
}

export class UploadImageCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];
    const uploadImageCarUseCase = container.resolve(UploadImageCarUseCase);
    const fileNames = images.map((file) => file.filename);
    await uploadImageCarUseCase.execute({
      car_id: id,
      image_name: fileNames,
    });
    return response.status(201).send();
  }
}
