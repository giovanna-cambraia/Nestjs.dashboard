import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReservationService } from '../services/createReservation.service';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: CreateReservationService) {}

  @Post()
  create(@User() id: number, @Body() body: CreateReservationDto) {
    return this.reservationService.create(id, body);
  }
}

/*  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}

*/
