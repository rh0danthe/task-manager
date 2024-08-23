import {Controller, Get, Query, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, Req} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entity/user.entity";
import {UserResponseDto} from "./dto/user-response.dto";

@ApiBearerAuth('JWT-auth')
@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOkResponse({
        type: UserResponseDto
    })
    @Get('me')
    getPostById(@Req() req): Promise<UserResponseDto> {
        const id = req.user.sub;

        const candidate = await this.userService.getById({ id });

        return { ...candidate };
    }
}