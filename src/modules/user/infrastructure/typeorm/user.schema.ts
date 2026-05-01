import { Email, PhoneNumber, Uuid } from '@shared/domain/value-objects';
import { User } from '@user/domain/entities/user.aggregate';
import { UserName, UserPasswordHash } from '@user/domain/value-objects';
import { EntitySchema } from 'typeorm';

export const UserTypeOrmSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
      nullable: false,
      default: () => 'uuid_generate_v4()',
      transformer: {
        to: (value: Uuid): string => value.value,
        from: (value: string): Uuid => new Uuid(value),
      },
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: false,
      transformer: {
        to: (value: Email): string => value.value,
        from: (value: string): Email => new Email(value),
      },
    },
    passwordHash: {
      name: 'password_hash',
      type: 'varchar',
      nullable: false,
      transformer: {
        to: (value: UserPasswordHash): string => value.value,
        from: (value: string): UserPasswordHash => new UserPasswordHash(value),
      },
    },
    phoneNumber: {
      name: 'phone_number',
      type: 'varchar',
      nullable: true,
      transformer: {
        to: (value: PhoneNumber | null): string | null => (value ? value.value : null),
        from: (value: string | null): PhoneNumber | null => (value ? new PhoneNumber(value) : null),
      },
    },
    userName: {
      name: 'user_name',
      type: 'varchar',
      nullable: false,
      transformer: {
        to: (value: UserName): string => value.value,
        from: (value: string): UserName => new UserName(value),
      },
    },
    isActive: {
      name: 'is_active',
      type: 'boolean',
      nullable: false,
      default: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      createDate: true,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      updateDate: true,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp',
      deleteDate: true,
      nullable: true,
    },
  },
});
