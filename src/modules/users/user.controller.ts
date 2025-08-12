import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './domain/dto/createUser.dto';
import { UpdateUserDTO } from './domain/dto/updateUser.dto';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwtAuth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { Role, type User as UserType } from '@prisma/client';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserMatchGuard } from 'src/shared/guards/userMatch.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  list(@User() user: UserType) {
    console.log(user);
    return this.userService.list();
  }

  @Get(':id')
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard, UserMatchGuard)
  @Patch(':id')
  updateUser(@ParamId() id: number, @Body() body: UpdateUserDTO) {
    return this.userService.update(id, body);
  }

  @UseGuards(UserMatchGuard)
  @Delete(':id')
  deleteUser(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
