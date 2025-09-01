import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { REPOSITORY_TOKEN_RESERVATIONS } from '../utils/repositoriesTokens';
import { HOTEL_REPOSITORY_TOKEN } from 'src/modules/hotels/utils/repositoriesTokens';
import type { IReservationRepository } from '../domain/repositories/Ireservations.interface';
import { differenceInDays, parseISO } from 'date-fns';
import type { IHotelRepository } from 'src/modules/hotels/domain/repositories/Ihotel.repositories';
import { Reservation, ReservationStatus } from '@prisma/client';


@Injectable()
export class CreateReservationService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATIONS)
    private readonly reservationRepository: IReservationRepository,
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepository: IHotelRepository
  ) {}

  async create(id: number, data: CreateReservationDto) {
    const checkInDate = parseISO(data.checkIn);
    const checkOutDate = parseISO(data.checkOut);
    const daysOfStay = differenceInDays(checkInDate, checkOutDate);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date.',
      );
    }

    const hotel = await this.hotelRepository.findHotelById(data.hotelId);

    if (!hotel) {
      throw new NotFoundException('Hotel not found.');
    }

    if (typeof hotel.price !== 'number' || hotel.price <= 0) {
      throw new BadRequestException('Invalid hotel price.');
    }

    const total = daysOfStay * hotel.price;

    const newReservation = {
      ...data,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      total,
      userId: id,
      status: ReservationStatus.PENDING,
    };

    return this.reservationRepository.create(newReservation);
  }
}
