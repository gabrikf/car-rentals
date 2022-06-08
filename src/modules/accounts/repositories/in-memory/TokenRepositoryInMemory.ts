import { ITokenDTO } from '@modules/accounts/dtos/ITokenDTO';
import { Tokens } from '@modules/accounts/infra/typeorm/entities/Tokens';

import { ITokenRepository } from '../ITokenRepository';

export class TokenRepositoryInMemory implements ITokenRepository {
  private tokens: Tokens[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ITokenDTO): Promise<Tokens> {
    const token = new Tokens();
    Object.assign(token, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.tokens.push(token);
    return token;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<Tokens> {
    return this.tokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );
  }
  async deleteById(id: string): Promise<void> {
    const index = this.tokens.findIndex((token) => token.id === id);
    this.tokens.splice(index);
  }
  async findByToken(token: string): Promise<Tokens> {
    return this.tokens.find((userToken) => userToken.refresh_token === token);
  }
  async findByUser(id: string): Promise<Tokens> {
    return this.tokens.find((token) => token.user_id === id);
  }
  async getAll(): Promise<Tokens[]> {
    return this.tokens;
  }
}
