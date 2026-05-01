import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = { message: string };

export class EmailNotAvailableException extends BaseDomainException<ExceptionData> {
  errorCode = 'email_not_available';
}
