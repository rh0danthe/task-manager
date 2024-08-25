import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class TaskCardCreateDto {
    @ApiProperty()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @MinLength(1)
    @MaxLength(1000)
    @ApiProperty()
    content: string;
}
