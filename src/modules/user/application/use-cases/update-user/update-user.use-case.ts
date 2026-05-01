import { useCaseException } from '@common/application/exceptions/use-case.exception';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { PhoneNumber, Uuid } from '@shared/domain/value-objects';
import { UserDto } from '@user/application/dto/user.dto';
import { UserNameNotAvailableException } from '@user/application/exceptions/user-name-not-available.exception';
import { UserNotFoundException } from '@user/application/exceptions/user-not-found.exception';
import { UserMapper } from '@user/application/mappers/user.mapper';
import type { IUserRepository } from '@user/application/ports';
import { UserName } from '@user/domain/value-objects';
import { UpdateUserBoundary } from './update-user.boundary';
import Input = UpdateUserBoundary.Input;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(id: string, input: Input): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOneById(new Uuid(id));

      if (!user) {
        throw new UserNotFoundException({ id });
      }

      const { phoneNumber, userName } = input;

      if (phoneNumber !== undefined) {
        user.updatePhoneNumber(phoneNumber ? new PhoneNumber(phoneNumber) : null);
      }

      if (userName) {
        if (!user.userName.equals(new UserName(userName))) {
          const isUserNameTaken = await this.userRepository.existsByUserName(new UserName(userName));

          if (isUserNameTaken) {
            throw new UserNameNotAvailableException({ message: 'This user name is unavailable' });
          }
        } else {
          user.updateUserName(new UserName(userName));
        }
      }

      this.eventPublisher.mergeObjectContext(await this.userRepository.save(user));

      user.commit();

      return UserMapper.toDto(user);
    } catch (error) {
      throw useCaseException(error);
    }
  }
}
