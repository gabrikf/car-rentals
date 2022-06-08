import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { ITokenRepository } from '@modules/accounts/repositories/ITokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload extends JwtPayload {
  email: string;
}

interface IResponse {
  refresh_token: string;
  new_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<IResponse> {
    try {
      const { sub, email } = verify(
        token,
        process.env.JWT_SECRET_REFRESH_TOKEN,
      ) as IPayload;
      const user_id = sub;

      const userToken = await this.tokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );
      if (!userToken) {
        throw new AppError('Refresh Token does not exist!');
      }
      await this.tokenRepository.deleteById(userToken.id);

      const refresh_token = sign(
        { email },
        process.env.JWT_SECRET_REFRESH_TOKEN,
        {
          subject: user_id,
          expiresIn: auth.expires_refresh_token,
        },
      );

      await this.tokenRepository.create({
        expires_date: this.dateProvider.addDays(
          auth.expires_refresh_token_numeric,
        ),
        refresh_token,
        user_id,
      });
      const new_token = sign({}, process.env.JWT_SECRET_TOKEN, {
        subject: user_id,
        expiresIn: auth.expires_token,
      });
      return { refresh_token, new_token };
    } catch {
      throw new AppError('Invalid token', 401);
    }
  }
}
