import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { EmailNotAvailableException } from '@shared/application/exceptions/email-not-available.exception';
import { Email } from '@shared/domain/value-objects';
import { User } from '@user/domain/entities/user.aggregate';
import { UserName } from '@user/domain/value-objects';
import * as argon2 from 'argon2';
import { UserNameNotAvailableException } from '../exceptions/user-name-not-available.exception';
import type { IUserRepository } from '../ports/user-repository.interface';
import { CreateUserBoundary } from '../use-cases/create-user/create-user.boundary';
import Input = CreateUserBoundary.Input;

@Injectable()
export class UserFactoryService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,

    private readonly eventPublisher: EventPublisher,
  ) {}

  async create(input: Input): Promise<User> {
    let user = await this.userRepository.findOneByEmail(new Email(input.email));

    if (user) {
      throw new EmailNotAvailableException({ message: 'If this is your account try logging in with your password' });
    }

    if (input.userName) {
      const isUserNameTaken = await this.userRepository.existsByUserName(new UserName(input.userName));

      if (isUserNameTaken) {
        throw new UserNameNotAvailableException({ message: 'This user name is not available' });
      }
    }

    const passwordHash = await argon2.hash(input.password);

    user = User.create({
      email: input.email,
      passwordHash,
      phoneNumber: input.phoneNumber,
      userName: input.userName,
    });

    this.eventPublisher.mergeObjectContext(await this.userRepository.save(user));

    user.commit();

    return user;
  }
}
