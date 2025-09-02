import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationService } from '../services/createReservation.service';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { FindByIdReservationsService } from '../services/findByIdReservations.service';
import { AuthGuard } from '@nestjs/passport';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateStatusReservationService } from '../services/updateStatusReservations.service';
import { Roles } from 'src/shared/decorators/roles.decorator';


@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly createReservationService: CreateReservationService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByIdReservationsService,
    private readonly updateStatusReservationService: UpdateStatusReservationService,
  ) {}

  @Roles(Role.USER)
  @Post()
  create(@User() id: number, @Body() body: CreateReservationDto) {
    return this.createReservationService.create(id, body);
  }

  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.findAllReservationsService.execute(id);
  }

   @Get('user')
  FindByUser(@User('id') id: number) {
    return this.findByIdReservationsService.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findAllReservationsService.execute(id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body('status') status: ReservationStatus) {
    return this.updateStatusReservationService.execute(id, status);
  }
}


/*


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}

*/
