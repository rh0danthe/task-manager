import { TaskCard } from '@prisma/client';

export class TaskCardEntity implements TaskCard {

    id: number;

    title: string;

    content: string;

    creatorId: number;

    columnId: number;
}
