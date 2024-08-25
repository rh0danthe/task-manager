import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class ColumnCreateDto {
    @ApiProperty()
    @MinLength(1)
    @MaxLength(255)
    title: string;
}
