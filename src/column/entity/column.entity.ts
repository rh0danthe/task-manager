import { Column } from '@prisma/client';

export class ColumnEntity implements Column {
    
    id: number;

    title: string;

    creatorId: number;
}
