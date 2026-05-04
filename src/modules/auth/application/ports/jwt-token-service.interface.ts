export type JwtAccessTokenPayload = {
  sub: string;
  email: string;
};

export type JwtRefreshTokenPayload = {
  sub: string;
  jti: string;
};

export interface IJwtTokenService {
  decodeToken(token: string): Promise<unknown>;
  signAccessToken(payload: JwtAccessTokenPayload): Promise<string>;
  signRefreshToken(payload: JwtRefreshTokenPayload): Promise<string>;
}
