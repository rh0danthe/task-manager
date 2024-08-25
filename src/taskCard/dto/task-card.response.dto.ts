import { ApiProperty } from '@nestjs/swagger';

export class TaskCardResponseDto {
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
