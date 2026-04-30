import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';

type ExceptionData = {
  reason: string;
};

export class InvalidPhoneNumberException extends BaseDomainException<ExceptionData> {
  _errorCode = 'invalid_phone_number';
}
