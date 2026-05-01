import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = { message: string };

export class UserNameNotAvailableException extends BaseDomainException<ExceptionData> {
  errorCode = 'user_name_not_available';
}
