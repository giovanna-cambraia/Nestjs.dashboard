import { IsBoolean, IsEmpty, IsOptional, IsString } from "class-validator";

export interface JwtPayload {
    username: string;
    iat?: number;
    expiresIn?: number;
    issuer?: string;
    sub: string;
    audience?: string;
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