import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
    @ApiProperty({
        description: 'Unique identifier of the column',
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Title of the column',
        type: String,
    })
    title: string;

    @ApiProperty({
        description: 'Identifier of the user who created the column',
        type: Number,
    })
    creatorId: number;
}
