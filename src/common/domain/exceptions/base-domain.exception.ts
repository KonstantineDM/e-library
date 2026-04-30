export type DomainErrorData = Record<string, unknown>;

export class BaseDomainException<T = Record<string, unknown>> extends Error {
  constructor(
    protected readonly data: T | Record<string, unknown> = {},
    protected readonly statusCode: number = 400,
    protected readonly errorCode: string = 'unspecified_domain_error',
    protected readonly customMessage: string | undefined = undefined,
  ) {
    super(customMessage);
    this.name = this.constructor.name;

    // Fix prototype chain (for instanceof)
    Object.setPrototypeOf(this, new.target.prototype);

    // Optional: capture stack trace in Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  getData(): T | Record<string, unknown> {
    return this.data;
  }

  getStatus(): number {
    return this.statusCode;
  }

  getErrorCode(): string {
    return this.errorCode;
  }

  getCustomMessage(): string | undefined {
    return this.customMessage;
  }
}
