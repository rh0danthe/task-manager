import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { TaskCardEntity } from '../../taskCard/entity/task-card.entity';

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
