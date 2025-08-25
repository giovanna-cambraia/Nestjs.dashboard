import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelService } from './services/createHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindOneHotelService } from './services/findOneHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { RemoveHotelsService } from './services/removeHotel.service';
import { HotelsRepositories } from './infra/hotels.repository';
import { FindByOwnerHotelsService } from './services/findByOwnerHotel.service';
import { FindByNameHotelsService } from './services/findByNameHotel.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesTokens';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelService,
    FindAllHotelsService,
    FindOneHotelService,
    UpdateHotelsService,
    RemoveHotelsService,
    FindByOwnerHotelsService,
    FindByNameHotelsService,
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepositories,
    }
  ],
})
export class HotelsModule {}
