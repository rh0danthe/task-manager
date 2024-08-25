import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ColumnResponseDto } from '../column/dto/column-response.dto';
import { ColumnService } from '../column/column.service';
import { TaskCardResponseDto } from 'src/taskCard/dto/task-card.response.dto';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { UserUpdateDto } from '../auth/dto/user-update.dto';
import { CommentService } from 'src/comment/comment.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly columnService: ColumnService,
        private readonly taskService: TaskCardService,
        private readonly commentService: CommentService
    ) {}

    @ApiOkResponse({
        type: UserResponseDto,
    })
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req): Promise<UserResponseDto> {
        const id = req.user.sub;

        return this.userService.getById({ id });
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
        isArray: true,
    })
    @Get(':id/taskcards/executing')
    @UseGuards(AuthGuard)
    async getExecutingCards(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getCardsByUserExecuting({ userId: id });
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
        isArray: true,
    })
    @Get(':id/taskcards/created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.taskService.getAllByCreatorId({ creatorId: id });
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
        isArray: true,
    })
    @Get(':id/comments')
    @UseGuards(AuthGuard)
    async getComments(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.commentService.getAllByCreatorId({ creatorId: id });
    }

    @ApiOkResponse({
        type: ColumnResponseDto,
    })
    @Get(':id/columns')
    @UseGuards(AuthGuard)
    async getAllColumnsByUser(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<ColumnResponseDto[]> {
        return this.columnService.getAllByCreatorId({ creatorId: userId });
    }
}
