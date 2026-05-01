export type UserAggregatePrimitives = {
  id: string;
  email: string;
  phoneNumber: string | null;
  userName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
