import { ApiProperty } from '@nestjs/swagger';

export class ColumnCreateDto {
    @ApiProperty()
    title: string;
}
