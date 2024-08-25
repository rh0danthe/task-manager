import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ColumnService } from '../column/column.service';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { CommentService } from 'src/comment/comment.service';
import { ApiOkArrayResponse } from 'src/common/swagger.utils';
import { TaskCardDto } from 'src/taskCard/dto/task-card.dto';
import { ArrayResponse, mapToArrayResponse } from 'src/common/array.response';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { ColumnDto } from 'src/column/dto/column.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly columnService: ColumnService,
        private readonly taskService: TaskCardService,
        private readonly commentService: CommentService,
    ) {}

    @ApiOperation({ summary: 'Get the current authenticated user\'s details' })
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully retrieved user details',
    })
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req): Promise<UserDto> {
        const id = req.user.sub;

        return this.userService.getById({ id });
    }

    @ApiOperation({ summary: 'Get all task cards currently being executed by a user' })
    @ApiOkArrayResponse(TaskCardDto)
    @Get(':id/taskcards/executing')
    @UseGuards(AuthGuard)
    async getExecutingCards(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<TaskCardDto>> {
        return mapToArrayResponse(
            await this.taskService.getCardsByUserExecuting({ userId: id }),
        );
    }

    @ApiOperation({ summary: 'Get all task cards created by a user' })
    @ApiOkArrayResponse(TaskCardDto)
    @Get(':id/taskcards/created')
    @UseGuards(AuthGuard)
    async getCreatedCards(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<TaskCardDto>> {
        return mapToArrayResponse(
            await this.taskService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOperation({ summary: 'Get all comments created by a user' })
    @ApiOkArrayResponse(CommentDto)
    @Get(':id/comments')
    @UseGuards(AuthGuard)
    async getComments(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<CommentDto>> {
        return mapToArrayResponse(
            await this.commentService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOperation({ summary: 'Get all columns created by a user' })
    @ApiOkArrayResponse(ColumnDto)
    @Get(':id/columns')
    @UseGuards(AuthGuard)
    async getAllColumnsByUser(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<ArrayResponse<ColumnDto>> {
        return mapToArrayResponse(
            await this.columnService.getAllByCreatorId({ creatorId: userId }),
        );
    }
}
