import { Module } from '@nestjs/common';
import { ReservationController } from './infra/reservation.controller';
import { CreateReservationService } from './services/createReservation.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationRepository } from './infra/reservations.repository';
import { HotelsRepositories } from '../hotels/infra/hotels.repository';
import { FindAllReservationsService } from './services/findAllReservations.service';
import { FindByIdReservationsService } from './services/findByIdReservations.service';
import { FindByUserReservationsService } from './services/findByUserReservations.service';
import { UpdateStatusReservationService } from './services/updateStatusReservations.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationController],
  providers: [
    CreateReservationService,
    FindAllReservationsService,
    FindByIdReservationsService,
    FindByUserReservationsService,
    UpdateStatusReservationService,

    {
      provide: 'REPOSITORY_TOKEN_RESERVATIONS',
      useClass: ReservationRepository,
    },
    {
      provide: 'HOTEL_REPOSITORY_TOKEN',
      useClass: HotelsRepositories,
    },
  ],
})
export class ReservationModule {}
