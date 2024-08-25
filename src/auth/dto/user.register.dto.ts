import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
    @ApiProperty({
        description: 'The name of the user',
        type: String,
    })
    @MinLength(2, { message: 'Name is too short. Minimum length is $constraint1 characters.' })
    @MaxLength(30, { message: 'Name is too long. Maximum length is $constraint1 characters.' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        format: 'email',
        minLength: 2,
        maxLength: 30,
        type: String,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        minLength: 6,
        type: String,
    })
    @MinLength(6, { message: 'Password is too short. Minimum length is $constraint1 characters.' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Password must contain at least one letter and one number.',
    })
    @IsString()
    password: string;
}
