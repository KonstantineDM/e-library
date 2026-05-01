export type UserAggregateInput = {
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  userName?: string;
  isActive?: boolean;
};
