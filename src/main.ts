import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ApiConfigService } from './core/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ApiConfigService);
  // app.setGlobalPrefix('api/v1');
  app.enableCors();

  await app.listen(configService.PORT);
  Logger.log(`⛩ starting API on PORT ${configService.PORT}`, 'API');
}
bootstrap();
