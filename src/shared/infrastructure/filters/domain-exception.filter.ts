import { BaseDomainException } from '@common/domain/exceptions/base-domain.exception';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BaseDomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: BaseDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const error = {
      status_code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      api_error_code: exception.getErrorCode(),
      message: exception.message || exception.getCustomMessage(),
    };

    const options = exception.getOptions();

    this.logger.error(JSON.stringify({ error, exception, body: request.body, options }));

    response.status(status).json({
      data: exception.getData(),
      error: error,
    });
  }
}
