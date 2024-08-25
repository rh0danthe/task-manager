import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class TaskCardUpdateDto {
    @ApiProperty()
    @IsOptional()
    @MinLength(1)
    @MaxLength(255)
    title?: string;

    @ApiProperty()
    @IsOptional()
    @MinLength(1)
    @MaxLength(1000)
    content?: string;
}
