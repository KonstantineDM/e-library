import { Email, Uuid } from '@shared/domain/value-objects';
import { User } from '@user/domain/entities/user.aggregate';
import { UserName } from '@user/domain/value-objects';

export interface IUserRepository {
  save(user: User): Promise<User>;

  findOneById(id: Uuid): Promise<User | null>;

  findOneByEmail(email: Email): Promise<User | null>;

  existsByUserName(userName: UserName): Promise<boolean>;
}
