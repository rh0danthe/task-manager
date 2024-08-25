import { ApiProperty } from '@nestjs/swagger';

export class ArrayResponse<T> {
    @ApiProperty()
    count: number;

    data: T[];
}

export function mapToArrayResponse<T>(array: T[]) {
    return {
        data: array,
        count: array.length,
    };
}
