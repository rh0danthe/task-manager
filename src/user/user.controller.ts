import {Controller, Get, Param, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserResponseDto} from "./dto/user-response.dto";
import {AuthGuard} from "../auth/guard/auth.guard";
import {ColumnResponseDto} from "../column/dto/column-response.dto";
import {ColumnService} from "../column/column.service";

@ApiBearerAuth('JWT-auth')
@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly columnService: ColumnService) {}

    @ApiOkResponse({
        type: UserResponseDto
    })
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req): Promise<UserResponseDto> {
        const id = req.user.sub;

        return this.userService.getById({id});
    }

    @ApiOkResponse({
        type: ColumnResponseDto
    })
    @Get(':userId/columns')
    @UseGuards(AuthGuard)
    async getAllColumnsByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ColumnResponseDto[]> {

        return this.columnService.getAllByCreatorId({creatorId: userId});
    }
}