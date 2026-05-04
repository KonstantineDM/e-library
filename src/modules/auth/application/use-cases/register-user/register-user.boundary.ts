export namespace RegisterUserBoundary {
  export interface Input {
    email: string;
    password: string;
    phoneNumber?: string;
    userName?: string;
  }
}
