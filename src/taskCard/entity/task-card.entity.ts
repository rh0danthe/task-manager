import { ApiProperty } from '@nestjs/swagger';
import { TaskCard } from '@prisma/client';
import { UserEntity } from '../../user/entity/user.entity';

export class TaskCardEntity implements TaskCard {
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
