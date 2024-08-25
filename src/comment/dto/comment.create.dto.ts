import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
    @ApiProperty()
    content: string;
}
