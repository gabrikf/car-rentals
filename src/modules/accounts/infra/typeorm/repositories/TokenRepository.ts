import { getRepository, In, Repository } from 'typeorm';

import { ITokenDTO } from '@modules/accounts/dtos/ITokenDTO';
import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';

import { Tokens } from '../entities/Tokens';

export class TokenRepository implements ITokenRepository {
  private repository: Repository<Tokens>;
  constructor() {
    this.repository = getRepository(Tokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ITokenDTO): Promise<Tokens> {
    const token = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(token);
    return token;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<Tokens> {
    const tokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return tokens;
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByToken(token: string): Promise<Tokens> {
    const userToken = await this.repository.findOne({
      refresh_token: token,
    });
    return userToken;
  }
  async findAllByUser(id: string): Promise<Tokens[]> {
    const tokens = await this.repository.find({
      user_id: id,
    });
    return tokens;
  }
  getAll(): Promise<Tokens[]> {
    throw new Error('Method not implemented.');
  }
  async massiveDeleteById(ids: string[]): Promise<void> {
    await this.repository.delete({ id: In(ids) });
  }
}
