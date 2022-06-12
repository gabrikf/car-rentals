import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserReponseDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

@injectable()
export class UserProfileUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}
