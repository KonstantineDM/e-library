export class UserPasswordHash {
  constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }
}
