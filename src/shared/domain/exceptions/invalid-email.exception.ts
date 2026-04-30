import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = {
  reason: string;
};

export class InvalidEmailException extends BaseDomainException<ExceptionData> {
  _errorCode = 'invalid_email';
}
