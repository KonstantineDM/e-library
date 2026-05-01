import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = { id?: string };

export class UserNotFoundException extends BaseDomainException<ExceptionData> {
  statusCode = 404;
  errorCode = 'user_not_found';
}
