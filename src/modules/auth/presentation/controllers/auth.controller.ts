import { RegisterUserUseCase } from '@auth/application/use-cases/register-user/register-user.use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtTokenResponseDto } from '../dto/jwt-token.response.dto';
import { LogInRequestDto } from '../dto/log-in.request.dto';
import { RegisterUserRequestDto } from '../dto/register-user.request.dto';

@ApiTags('Authentication and Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly logInUserUseCase: LogInUserUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register (create) new user' })
  @ApiOkResponse({ type: JwtTokenResponseDto })
  async registerUser(@Body() body: RegisterUserRequestDto): Promise<JwtTokenResponseDto> {
    return this.registerUserUseCase.execute(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log user in' })
  @ApiOkResponse({ type: JwtTokenResponseDto })
  async logInUser(@Body() body: LogInRequestDto): Promise<JwtTokenResponseDto> {
    return this.logInUserUseCase.execute(body);
  }

  // @Post('logout')
  // @ApiOperation({ summary: 'Log user out' })
  // async logOutUser(): Promise<void> {}

  // @Post('refresh')
  // async refreshAccessToken(): Promise<JwtTokenResponseDto> {}
}
