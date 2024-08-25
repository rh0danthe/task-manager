import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDto {
    @ApiProperty()
    @IsOptional()
    name?: string;

    @ApiProperty({
        format: 'email',
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @MinLength(6)
    @IsOptional()
    password?: string;
}
