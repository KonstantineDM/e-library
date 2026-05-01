import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactoryService } from './application/services/user-factory.service';
import { CreateUserUseCase, GetUserByIdUseCase } from './application/use-cases';
import { DeleteUserUseCase } from './application/use-cases/delete-user/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user/update-user.use-case';
import { UserTypeOrmRepository } from './infrastructure/typeorm/user.repository';
import { UserTypeOrmSchema } from './infrastructure/typeorm/user.schema';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserTypeOrmSchema])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,

    {
      provide: 'USER_FACTORY',
      useClass: UserFactoryService,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: ['USER_FACTORY'],
})
export class UserModule {}
