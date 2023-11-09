import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as autoIncrement from 'mongoose-auto-increment';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigModule } from './core/config/config.module';
import { ApiConfigService } from './core/config/config.service';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ApiConfigService) => {
        const options: MongooseModuleOptions = configService.mongoConnexion

        options.connectionFactory = (connection) => {
          autoIncrement.initialize(connection); 
          connection.plugin(require('mongoose-delete'), { deletedAt: true });
          return connection;
        }
        return options;
      },
      inject: [ApiConfigService],
    }),
    UsersModule,
    AuthModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService],
})
export class AppModule {}
