import { Module, forwardRef } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { appointmentSchema } from './entities/appointment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { EmailService } from 'src/core/shared/email.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: "Appointment", schema: appointmentSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, EmailService],
  exports: [AppointmentsService]
})
export class AppointmentsModule { }
