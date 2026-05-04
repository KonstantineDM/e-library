import type { IJwtTokenService } from '@auth/application/ports/jwt-token-service.interface';
import { JwtTokenResponseDto } from '@auth/presentation/dto/jwt-token.response.dto';
import { useCaseException } from '@common/application/exceptions/use-case.exception';
import { Inject, Injectable } from '@nestjs/common';
import { Uuid } from '@shared/domain/value-objects';
import type { IUserFactoryService } from '@user/application/ports';
import { RegisterUserBoundary } from './register-user.boundary';
import Input = RegisterUserBoundary.Input;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('USER_FACTORY') private readonly userFactoryService: IUserFactoryService,
    @Inject('JWT_TOKEN_SERVICE') private readonly jwtTokenService: IJwtTokenService,
  ) {}

  async execute(input: Input): Promise<JwtTokenResponseDto> {
    try {
      const user = await this.userFactoryService.create(input);

      const accessToken = await this.jwtTokenService.signAccessToken({ sub: user.id.value, email: user.email.value });
      const refreshToken = await this.jwtTokenService.signRefreshToken({
        sub: user.id.value,
        jti: Uuid.generate().value,
      });

      const { iat, exp } = (await this.jwtTokenService.decodeToken(accessToken)) as { iat: number; exp: number };

      return { accessToken, refreshToken, iat, exp };
    } catch (error) {
      throw useCaseException(error);
    }
  }
}
