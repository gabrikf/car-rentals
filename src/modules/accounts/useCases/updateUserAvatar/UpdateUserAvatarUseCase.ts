import { inject, injectable } from 'tsyringe';

import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvarDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}
