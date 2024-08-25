import { ApiProperty } from '@nestjs/swagger';

export class CommentUpdateDto {
    @ApiProperty()
    content: string;
}
