import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsString } from 'class-validator';

export class TaskCardCreateDto {
    @ApiProperty({
        description: 'Title of the task card',
        minLength: 1,
        maxLength: 255,
        type: String
    })
    @MinLength(1)
    @MaxLength(255)
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Content or description of the task card',
        minLength: 1,
        maxLength: 1000,
        type: String
    })
    @MinLength(1)
    @MaxLength(1000)
    @IsString()
    content: string;
}
