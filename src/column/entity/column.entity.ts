import { ApiProperty } from '@nestjs/swagger';
import { Column } from '@prisma/client';

export class ColumnEntity implements Column {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    creatorId: number;
}
