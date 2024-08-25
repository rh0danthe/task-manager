import { ApiProperty } from '@nestjs/swagger';

export class TaskCardUpdateRequestDto {
    @ApiProperty()
    title?: string;

    @ApiProperty()
    content?: string;
}
