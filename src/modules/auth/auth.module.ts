import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { RegisterUserUseCase } from './application/use-cases/register-user/register-user.use-case';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.getOrThrow<string>('JWT_ACCESS_EXPIRES_IN')),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, JwtStrategy, { provide: 'JWT_TOKEN_SERVICE', useClass: JwtTokenService }],
})
export class AuthModule {}
