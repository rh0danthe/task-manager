import { ApiProperty } from '@nestjs/swagger';

export class TaskCardDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    creatorId: number;

    @ApiProperty()
    columnId: number;
}
