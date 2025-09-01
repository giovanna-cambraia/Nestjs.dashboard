import { Injectable } from '@nestjs/common';
import { IReservationRepository } from '../domain/repositories/Ireservations.interface';
import { Reservation, ReservationStatus } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
  }

  async findById(id: number): Promise<Reservation> {
    return this.prisma.reservation.findUniqueOrThrow({ where: { id } });
  }

  findByOwner(ownerId: number): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }
  findByUser(userId: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { userId } });
  }

  updateStatus(id: number, status: ReservationStatus): Promise<Reservation> {
    return this.prisma.reservation.update({ where: { id }, data: { status } });
  }
}
