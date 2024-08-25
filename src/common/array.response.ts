import { ApiProperty } from '@nestjs/swagger';

export class ArrayResponse<T> {
    @ApiProperty({
        description: 'Total number of items in the array',
        type: Number,
    })
    count: number;

    data: T[];
}

export function mapToArrayResponse<T>(array: T[]) {
    return {
        data: array,
        count: array.length,
    };
}
