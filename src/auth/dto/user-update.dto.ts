import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
    @ApiProperty({
        description: 'The name of the user',
        required: false,
        type: String,
    })
    @MinLength(2, { message: 'Name is too short. Minimum length is $constraint1 characters.' })
    @MaxLength(30, { message: 'Name is too long. Maximum length is $constraint1 characters.' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'The email address of the user',
        format: 'email',
        required: false,
        minLength: 2,
        maxLength: 30,
        type: String,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'The password of the user',
        minLength: 6,
        required: false,
        type: String,
    })
    @MinLength(6, { message: 'Password is too short. Minimum length is $constraint1 characters.' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Password must contain at least one letter and one number.',
    })
    @IsString()
    @IsOptional()
    password?: string;
}
