import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
    
    id: number;

    content: string;

    creatorId: number;

    taskcardId: number;
}
