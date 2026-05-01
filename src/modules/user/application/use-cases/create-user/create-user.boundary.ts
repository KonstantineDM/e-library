export namespace CreateUserBoundary {
  export interface Input {
    email: string;
    password: string;
    phoneNumber?: string;
    userName?: string;
    isActive?: boolean;
  }
}
