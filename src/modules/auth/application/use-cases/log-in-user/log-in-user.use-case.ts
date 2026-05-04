import { JwtTokenResponseDto } from '@auth/presentation/dto/jwt-token.response.dto';
import { useCaseException } from '@common/application/exceptions/use-case.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogInUserUseCase {
  constructor() {}

  async execute(): Promise<JwtTokenResponseDto> {
    try {
    } catch (error) {
      throw useCaseException(error);
    }
  }
}
