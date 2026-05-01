import { AggregateRoot } from '@nestjs/cqrs';
import { Email, PhoneNumber, Uuid } from '@shared/domain/value-objects';
import { UserCreatedEvent, UserDeletedEvent, UserNameUpdatedEvent, UserPhoneNumberUpdatedEvent } from '../events';
import { UserAggregateInput as Input } from '../types/user-aggregate-input.type';
import { UserAggregatePrimitives as Primitives } from '../types/user-aggregate-primitives.type';
import { UserName, UserPasswordHash } from '../value-objects';

export class User extends AggregateRoot {
  private constructor(
    public readonly id: Uuid,
    public readonly email: Email,
    public readonly passwordHash: UserPasswordHash,
    public phoneNumber: PhoneNumber | null,
    public userName: UserName,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {
    super();
  }

  public static create(input: Input): User {
    const uuid = Uuid.generate();
    const email = new Email(input.email);
    const passwordHash = new UserPasswordHash(input.passwordHash);
    const phoneNumber = input.phoneNumber ? new PhoneNumber(input.phoneNumber) : null;
    const userName = input.userName ? new UserName(input.userName) : new UserName(input.email);
    const isActive = true;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = null;

    const user = new User(uuid, email, passwordHash, phoneNumber, userName, isActive, createdAt, updatedAt, deletedAt);

    user.apply(new UserCreatedEvent(user.toPrimitives()));

    return user;
  }

  public delete(): User {
    if (this.deletedAt) {
      return this;
    }

    this.deletedAt = new Date();
    this.updatedAt = new Date();

    this.apply(new UserDeletedEvent(this.toPrimitives()));

    return this;
  }

  private toPrimitives(): Primitives {
    return {
      id: this.id.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber ? this.phoneNumber.value : null,
      userName: this.userName.value,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  public updatePhoneNumber(phoneNumber: PhoneNumber | null): User {
    if (this.phoneNumber && phoneNumber && this.phoneNumber.equals(phoneNumber)) {
      return this;
    }

    this.phoneNumber = phoneNumber;
    this.updatedAt = new Date();

    this.apply(new UserPhoneNumberUpdatedEvent(this.toPrimitives()));

    return this;
  }

  public updateUserName(userName: UserName): User {
    if (this.userName && this.userName.equals(userName)) {
      return this;
    }

    this.userName = userName;
    this.updatedAt = new Date();

    this.apply(new UserNameUpdatedEvent(this.toPrimitives()));

    return this;
  }
}
