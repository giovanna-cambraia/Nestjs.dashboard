import { Inject, Injectable } from "@nestjs/common";
import { HOTEL_REPOSITORY_TOKEN } from "../utils/repositoriesTokens";
import type { IHotelRepository } from "../domain/repositories/Ihotel.repositories";

@Injectable()
export class FindByOwnerHotelsService {
    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepositories: IHotelRepository,
    ) {}
    async execute(ownerId: string) {
        return await this.hotelRepositories.findHotelByOwner(Number(ownerId))
    }
}