import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './domain/dto/createUser.dto';
import { UpdateUserDTO } from './domain/dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { userSelectField } from '../utils/userSelectFields';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.findByEmail(body.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    body.password = await this.hashPassword(body.password);
    return await this.prisma.user.create({
      data: body,
      select: userSelectField,
    });
  }

  async list() {
    return await this.prisma.user.findMany({
      select: userSelectField,
      
    });
  }

  async show(id: number) {
    const user = await this.isIdExists(id);
    return user;
  }

  async update(id: number, body: UpdateUserDTO) {
    await this.isIdExists(id);

    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }

    return await this.prisma.user.update({
      where: { id },
      data: body,
      select: userSelectField
    });
  }

  async delete(id: number) {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
