import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';

export interface JwtPayload {
  sub: number;
  name: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export class ValidateTokenDTO {
  @IsBoolean()
  @IsEmpty()
  valid: boolean;

  decoded?: JwtPayload;

  @IsString()
  @IsOptional()
  message?: string;
}
