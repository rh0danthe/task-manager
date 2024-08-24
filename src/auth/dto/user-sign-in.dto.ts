import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserSignInDto {
    @ApiProperty({
        format: 'email'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
