import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
    @ApiProperty({
        description: 'The email address of the user',
        format: 'email',
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
