import { ApiProperty } from "@nestjs/swagger";

export class ColumnRequestDto{

    @ApiProperty()
    title: string;
}