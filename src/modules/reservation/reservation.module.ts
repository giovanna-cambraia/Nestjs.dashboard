import { Module } from '@nestjs/common';
import { ReservationController } from './infra/reservation.controller';
import { CreateReservationService } from './services/createReservation.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationRepository } from './infra/reservations.repository';
import { HotelsRepositories } from '../hotels/infra/hotels.repository';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationController],
  providers: [
    CreateReservationService,
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
