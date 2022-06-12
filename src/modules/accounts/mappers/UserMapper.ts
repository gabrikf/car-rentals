import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserReponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMapper {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
