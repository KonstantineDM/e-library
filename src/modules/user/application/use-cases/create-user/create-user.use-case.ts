import { useCaseException } from '@common/application/exceptions/use-case.exception';
import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '@user/application/dto/user.dto';
import { UserMapper } from '@user/application/mappers/user.mapper';
import type { IUserFactoryService } from '@user/application/ports';
import { CreateUserBoundary } from './create-user.boundary';
import Input = CreateUserBoundary.Input;

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('USER_FACTORY') private readonly userFactoryService: IUserFactoryService) {}

  async execute(input: Input): Promise<UserDto> {
    try {
      const user = await this.userFactoryService.create(input);
      return UserMapper.toDto(user);
    } catch (error) {
      throw useCaseException(error);
    }
  }
}
