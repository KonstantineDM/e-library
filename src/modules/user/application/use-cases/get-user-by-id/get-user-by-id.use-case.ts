import { useCaseException } from '@common/application/exceptions/use-case.exception';
import { Inject, Injectable } from '@nestjs/common';
import { Uuid } from '@shared/domain/value-objects';
import { UserDto } from '@user/application/dto/user.dto';
import { UserNotFoundException } from '@user/application/exceptions/user-not-found.exception';
import { UserMapper } from '@user/application/mappers/user.mapper';
import type { IUserRepository } from '@user/application/ports';

@Injectable()
export class GetUserByIdUseCase {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOneById(new Uuid(id));

      if (!user) {
        throw new UserNotFoundException({ id });
      }

      return UserMapper.toDto(user);
    } catch (error) {
      throw useCaseException(error);
    }
  }
}
