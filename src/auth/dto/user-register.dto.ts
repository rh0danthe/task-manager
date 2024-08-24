import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class UserRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        format: 'email'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
