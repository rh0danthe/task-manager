import { ApiProperty } from '@nestjs/swagger';

export class ColumnUpdateDto {
    @ApiProperty()
    title: string;
}
