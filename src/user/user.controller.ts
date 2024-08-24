import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entity/user.entity";
import {UserResponseDto} from "./dto/user-response.dto";
import {AuthGuard} from "../auth/auth.guard";

@ApiBearerAuth('JWT-auth')
@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOkResponse({
        type: UserResponseDto
    })
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req): Promise<UserResponseDto> {
        const id = req.user.sub;

        const candidate = await this.userService.getById({ id });

        return { ...candidate };
    }
}