import { InvalidUserNameException } from '../exceptions';

export class UserName {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  public equals(other: UserName): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  private validate(): void {
    if (!this.value) {
      throw new InvalidUserNameException({
        reason: 'User name must be defined',
      });
    }

    const MAX_LENGTH = 128;
    const MIN_LENGTH = 1;

    if (this.value.length > MAX_LENGTH || this.value.length < MIN_LENGTH) {
      throw new InvalidUserNameException({
        reason: 'User name length is invalid',
      });
    }
  }
}
