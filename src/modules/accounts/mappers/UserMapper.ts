import { IUserResponseDTO } from '../dtos/IUserReponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMapper {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: User): IUserResponseDTO {
    return {
      email,
      name,
      id,
      avatar,
      driver_license,
    };
  }
}
