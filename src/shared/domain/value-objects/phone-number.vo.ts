import { InvalidPhoneNumberException } from '../exceptions';

export class PhoneNumber {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  public equals(other: PhoneNumber): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  private validate(): void {
    if (!this.value) {
      throw new InvalidPhoneNumberException({
        reason: 'Phone number must be defined',
      });
    }

    const MAX_LENGTH = 15;
    const MIN_LENGTH = 7;

    if (this.value.length > MAX_LENGTH || this.value.length < MIN_LENGTH) {
      throw new InvalidPhoneNumberException({
        reason: 'Phone number length is invalid',
      });
    }
  }
}
