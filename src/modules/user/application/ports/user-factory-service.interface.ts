import { User } from '@user/domain/entities/user.aggregate';

type CreateUserInput = {
  email: string;
  password: string;
  phoneNumber?: string;
  userName?: string;
  isActive?: boolean;
};

export interface IUserFactoryService {
  /**
   * @throws EmailNotAvailableException
   * @throws UserNameNotAvailableException
   * @param input CreateUserBoundary.Input
   * @returns User
   */
  create(input: CreateUserInput): Promise<User>;
}
