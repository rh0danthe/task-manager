import { ApiProperty } from '@nestjs/swagger';

export class TaskCardDto {
    @ApiProperty({
        description: 'Unique identifier of the task card',
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Title of the task card',
        type: String,
    })
    title: string;

    @ApiProperty({
        description: 'Description of the task card',
        type: String,
    })
    content: string;

    @ApiProperty({
        description: 'Identifier of the user who created the task card',
        type: Number,
    })
    creatorId: number;

    @ApiProperty({
        description: 'Identifier of the column to which the task card belongs',
        type: Number,
    })
    columnId: number;
}
