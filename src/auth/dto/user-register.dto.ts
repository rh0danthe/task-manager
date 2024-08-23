import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
