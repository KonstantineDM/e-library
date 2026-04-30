import { InvalidEmailException } from '../exceptions';

export class Email {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  public equals(other: Email): boolean {
    if (!other) return false;

    return this.value === other.value;
  }

  private validate(): void {
    if (!this.value) {
      throw new InvalidEmailException({ reason: 'Email must be defined' });
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isPatterValid = pattern.test(this.value);

    if (!isPatterValid) {
      throw new InvalidEmailException({ reason: 'Invalid email format' });
    }

    const TOTAL_MAX_LENGTH = 254;
    const LOCAL_MAX_LENGTH = 64;
    const DOMAIN_MAX_LENGTH = 255;

    const [local, domain] = this.value.split('@');

    if (this.value.length > TOTAL_MAX_LENGTH || local.length > LOCAL_MAX_LENGTH || domain.length > DOMAIN_MAX_LENGTH) {
      throw new InvalidEmailException({
        reason: 'Email length is more than maximum',
      });
    }

    const TOTAL_MIN_LENGTH = 3;
    const DOMAIN_MIN_LENGTH = 2;

    if (this.value.length < TOTAL_MIN_LENGTH || domain.length < DOMAIN_MIN_LENGTH) {
      throw new InvalidEmailException({
        reason: 'Email length is less than minimum',
      });
    }
  }
}
