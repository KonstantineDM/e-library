import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty({ example: 1755000000 })
  iat!: number;

  @ApiProperty({ example: 1755000000 })
  exp!: number;
}
