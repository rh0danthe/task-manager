import { ColumnDto } from '../dto/column.dto';
import { ColumnEntity } from '../entity/column.entity';

export function mapToColumnDto(db: ColumnEntity) {
    return {
        id: db.id,
        title: db.title,
        creatorId: db.creatorId,
    } as ColumnDto;
}
