import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN_RESERVATIONS } from "../utils/repositoriesTokens";
import type { IReservationRepository } from "../domain/repositories/Ireservations.interface";
import { ReservationStatus } from "@prisma/client";

@Injectable()
export class UpdateStatusReservationService {
    constructor(
        @Inject(REPOSITORY_TOKEN_RESERVATIONS)
        private reservationsRepository: IReservationRepository,
    ) {}

    async execute(id: number, status: ReservationStatus) {
        return this.reservationsRepository.updateStatus(id, status);
    }
}
