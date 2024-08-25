import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    creatorId: number;

    @ApiProperty()
    taskcardId: number;
}
