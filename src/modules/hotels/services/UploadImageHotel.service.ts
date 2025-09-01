import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateHotelDto } from "../domain/dto/update-hotel.dto";
import { HOTEL_REPOSITORY_TOKEN } from "../utils/repositoriesTokens";
import type { IHotelRepository } from "../domain/repositories/Ihotel.repositories";
import { join, resolve } from "path";
import { stat, unlink } from "fs/promises";


@Injectable()
export class UploadImageHotelService {
    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepositories: IHotelRepository,
    ) {}

    async execute(id: string, imageFileName: string) {
        const hotel = await this.hotelRepositories.findHotelById(Number(id));
        const directory = resolve(__dirname, '..', '..', '..', '..', 'uploads-hotels');

        if (!hotel) {
            throw new NotFoundException('Hotel not found.');
        }

        if (hotel.image) {
            const imageHotelFilePath = join(directory, hotel.image);
            const imageHotelFileExists = await stat(imageHotelFilePath);

            if (imageHotelFileExists) {
                await unlink(imageHotelFilePath)
            }
        }
        return await this.hotelRepositories.updateHotel(Number(id), {
            image: imageFileName,
        });
    }
}
