import { ApiProperty } from '@nestjs/swagger';

export class CommentRequestDto {

    @ApiProperty()
    content: string;
}
