import {
  IJwtTokenService,
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload,
} from '@auth/application/ports/jwt-token-service.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async decodeToken(token: string): Promise<JwtAccessTokenPayload | JwtRefreshTokenPayload> {
    return this.jwtService.decode(token);
  }

  async signAccessToken(payload: JwtAccessTokenPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async signRefreshToken(payload: JwtRefreshTokenPayload): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN') });
  }
}
