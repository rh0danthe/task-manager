import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'Unique identifier for the user',
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the user',
        type: String,
    })
    name: string;

    @ApiProperty({
        description: 'Email address of the user',
        format: 'email',
        type: String,
    })
    email: string;
}
