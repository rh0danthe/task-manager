import { ApiProperty } from '@nestjs/swagger';

export class TaskCardCreateRequestDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}
