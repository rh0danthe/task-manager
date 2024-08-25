import { TaskCardResponseDto } from '../dto/task-card.response.dto';
import { TaskCardEntity } from '../entity/task-card.entity';

export function mapToTaskCardDto(db: TaskCardEntity) {
    return {
        id: db.id,
        title: db.title,
        content: db.content,
        creatorId: db.creatorId,
        columnId: db.columnId,
    } as TaskCardResponseDto;
}
