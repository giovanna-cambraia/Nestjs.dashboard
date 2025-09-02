import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN_RESERVATIONS } from "../utils/repositoriesTokens";
import type { IReservationRepository } from "../domain/repositories/Ireservations.interface";

@Injectable()
export class FindAllReservationsService {
    constructor(
        @Inject(REPOSITORY_TOKEN_RESERVATIONS)
        private reservationsRepository: IReservationRepository,
    ) {}

    async execute(id: number) {
        return this.reservationsRepository.findAll();
    }
}
