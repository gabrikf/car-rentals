import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface ICategories {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  loadCategories(file: Express.Multer.File): Promise<ICategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ICategories[] = [];
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name } = category;
      const exist = this.categoryRepository.findByName(name);
      if (!exist) {
        this.categoryRepository.create(category);
      }
    });
  }
}
