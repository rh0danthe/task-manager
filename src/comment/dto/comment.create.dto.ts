import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CommentCreateDto {
    @ApiProperty()
    @MinLength(1)
    @MaxLength(1000)
    content: string;
}
