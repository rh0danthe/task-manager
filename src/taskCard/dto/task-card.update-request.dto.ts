import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class TaskCardUpdateDto {
    @ApiProperty({
        description: 'Title of the task card',
        minLength: 1,
        maxLength: 255,
        required: false,
        type: String
    })
    @MinLength(1)
    @MaxLength(255)
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({
        description: 'Content or description of the task card',
        minLength: 1,
        maxLength: 1000,
        required: false,
        type: String
    })
    @MinLength(1)
    @MaxLength(1000)
    @IsString()
    @IsOptional()
    content?: string;
}
