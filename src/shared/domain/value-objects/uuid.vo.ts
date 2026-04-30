import { randomUUID } from 'crypto';

export class Uuid {
  constructor(private readonly _value: string) {}

  static generate(): Uuid {
    return new Uuid(randomUUID());
  }

  get value(): string {
    return this._value;
  }
}
