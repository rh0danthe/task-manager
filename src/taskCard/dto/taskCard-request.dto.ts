import {ApiProperty} from "@nestjs/swagger";

export class TaskCardRequestDto{

    @ApiProperty()
    content: string;
}