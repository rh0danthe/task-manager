import { CommentDto } from '../dto/comment.dto';
import { CommentEntity } from '../entity/comment.entity';

export function mapToCommentDto(db: CommentEntity) {
    return {
        id: db.id,
        content: db.content,
        creatorId: db.creatorId,
        taskcardId: db.taskcardId,
    } as CommentDto;
}
