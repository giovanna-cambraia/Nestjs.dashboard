import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelService } from '../services/createHotel.service';
import { FindOneHotelService } from '../services/findOneHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindByNameHotelsService } from '../services/findByNameHotel.service';
import { FindByOwnerHotelsService } from '../services/findByOwnerHotel.service';
import { Role } from 'generated/prisma';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelService,
    private readonly findOneHotelService: FindOneHotelService,
    private readonly findAllHotelService: FindAllHotelsService,
    private readonly updateHotelService: UpdateHotelsService,
    private readonly removeHotelService: RemoveHotelsService,
    private readonly findHotelByOwnerService: FindByOwnerHotelsService,
    private readonly findHotelByNameService: FindByNameHotelsService,
  ) {}

  @Roles(Role.USER)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.findAllHotelService.execute();
  }


  @Roles(Role.USER)
  @Get('name')
  findName(@Query('name') name: string) {
    return this.findHotelByNameService.execute(name);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOwner(@Param('ownerId') ownerId: string) {
    return this.findHotelByOwnerService.execute(ownerId);
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotelService.execute(id);
  }

  @Roles(Role.USER)
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelService.execute(id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelService.execute(id);
  }
}
