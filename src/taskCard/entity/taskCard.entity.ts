import { ApiProperty } from "@nestjs/swagger";
import {TaskCard} from "@prisma/client";

export class taskCardEntity implements TaskCard {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    creatorId: number;
}