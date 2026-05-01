import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

export function useCaseException(error: unknown): BaseDomainException<unknown> {
  if (error instanceof BaseDomainException) {
    return error;
  }

  if (error instanceof Error) {
    return new BaseDomainException(error.message, { cause: error });
  }

  return new BaseDomainException('Unknown exception', { cause: error });
}
