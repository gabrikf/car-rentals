import { inject, injectable } from 'tsyringe';

import { removeFileFromPaths } from '../../../../utils/removeFileFromPaths';
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
    if (user.avatar) {
      await removeFileFromPaths(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}
