import { DocumentBuilder } from '@nestjs/swagger';
import * as packageJson from '../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('E-Library')
  .setDescription('API for E-Library')
  .setVersion(packageJson.version)
  .build();
