import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiProperty({
        description: 'Unique identifier of the comment',
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Content of the comment',
        type: String,
    })
    content: string;

    @ApiProperty({
        description: 'Identifier of the user who created the comment',
        type: Number,
    })
    creatorId: number;

    @ApiProperty({
        description: 'Identifier of the task card to which the comment belongs',
        type: Number,
    })
    taskcardId: number;
}
