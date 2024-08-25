import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class UserUpdateDto {
    @ApiProperty()
    name?: string;

    @ApiProperty({
        format: 'email',
    })
    @IsEmail()
    email?: string;

    @ApiProperty()
    @MinLength(6)
    password?: string;
}
