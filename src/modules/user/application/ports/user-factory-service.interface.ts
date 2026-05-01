import { User } from '@user/domain/entities/user.aggregate';

type CreateUserInput = {
  email: string;
  password: string;
  phoneNumber?: string;
  userName?: string;
  isActive?: boolean;
};

export interface IUserFactoryService {
  create(input: CreateUserInput): Promise<User>;
}
