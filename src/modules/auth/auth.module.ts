import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../users/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d', issuer: 'dnc_hotel', audience: 'users' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
