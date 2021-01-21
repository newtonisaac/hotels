import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import configuration from './configuration'
import { AppService } from './app.service';


async function bootstrap() {
  NestFactory.createApplicationContext(AppModule, configuration().main)
    .then(appContext => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(AppService);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch(error => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
