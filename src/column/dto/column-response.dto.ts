import { ApiProperty } from "@nestjs/swagger";
import {Column} from "@prisma/client";

export class ColumnResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    creatorId: number;
}