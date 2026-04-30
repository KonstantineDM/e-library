import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from '@shared/infrastructure/filters/domain-exception.filter';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new DomainExceptionFilter());

  if (process.env.NODE_ENV === 'development') {
    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory);
  }

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT, () => logger.verbose(`App is listening on port ${PORT}`));
}
bootstrap();
