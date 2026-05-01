import { InjectDataSource } from '@nestjs/typeorm';
import { Email, Uuid } from '@shared/domain/value-objects';
import { BaseTypeOrmRepository } from '@shared/infrastructure/typeorm/repositories/base-typeorm.repository';
import type { IUserRepository } from '@user/application/ports';
import { User } from '@user/domain/entities/user.aggregate';
import { UserName } from '@user/domain/value-objects';
import { DataSource } from 'typeorm';
import { UserTypeOrmSchema } from './user.schema';

export class UserTypeOrmRepository extends BaseTypeOrmRepository<User> implements IUserRepository {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource, UserTypeOrmSchema);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneById(id: Uuid): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: Email): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async existsByUserName(userName: UserName): Promise<boolean> {
    return this.repository.existsBy({ userName });
  }
}
