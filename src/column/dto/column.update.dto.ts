import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ColumnUpdateDto {
    @ApiProperty({
        description: 'The title of the column. Must be a string between 1 and 255 characters.',
        minLength: 1,
        maxLength: 255,
        type: String,
    })
    @IsString()
    @MinLength(1, { message: 'Title is too short. Minimum length is $constraint1 character.' })
    @MaxLength(255, { message: 'Title is too long. Maximum length is $constraint1 characters.' })
    title: string;
}
