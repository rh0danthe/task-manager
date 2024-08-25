import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CommentUpdateDto {
    @ApiProperty({
        description: 'Content of the comment',
        minLength: 1,
        maxLength: 1000,
        type: String
    })
    @MinLength(1)
    @MaxLength(1000)
    @IsString()
    content: string;
}
