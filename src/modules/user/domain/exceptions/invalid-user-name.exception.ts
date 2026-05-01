import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = {
  reason: string;
};

export class InvalidUserNameException extends BaseDomainException<ExceptionData> {
  _errorCode = 'invalid_user_name';
}
