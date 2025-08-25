import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/create-hotel.dto";
import { UpdateHotelDto } from "../dto/update-hotel.dto";
export interface IHotelRepository {
    createHotel(data: CreateHotelDto): Promise<Hotel>;
    findHotelById(id: number): Promise<Hotel | null>;
    findHotelByName(name: string): Promise <Hotel | null>;
    findHotels(): Promise<Hotel[]>;
    updateHotel(id: number, data: UpdateHotelDto): Promise <Hotel>;
    deleteHotel(id: number): Promise<Hotel>;
    findHotelByOwner(ownerId: number): Promise<Hotel[]>
}