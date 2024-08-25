import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { TaskCardDto } from './dto/task-card.dto';
import { TaskCardService } from './task-card.service';
import { RightGuardTaskCard } from 'src/auth/guard/right.guard.task-card';
import { TaskCardUpdateDto } from './dto/task-card.update-request.dto';
import { CommentService } from 'src/comment/comment.service';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { ApiOkArrayResponse } from 'src/common/swagger.utils';
import { ArrayResponse, mapToArrayResponse } from 'src/common/array.response';
import { CommentCreateDto } from 'src/comment/dto/comment.create.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Taskcards')
@Controller('taskcards')
export class TaskCardController {
    constructor(
        private readonly taskService: TaskCardService,
        private readonly commentService: CommentService,
    ) {}

    @ApiOperation({ summary: 'Get all task cards created by the authentificated user' })
    @ApiOkArrayResponse(TaskCardDto)
    @Get('created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req): Promise<ArrayResponse<TaskCardDto>> {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.taskService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOperation({ summary: 'Get all task cards being executed by the authentificated user' })
    @ApiOkArrayResponse(TaskCardDto)
    @Get('executing')
    @UseGuards(AuthGuard)
    async getExecutingCards(@Req() req) {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.taskService.getCardsByUserExecuting({ userId: id }),
        );
    }

    @ApiOperation({ summary: 'Get a specific task card by its ID' })
    @ApiOkResponse({
        type: TaskCardDto,
        description: 'Successfully retrieved task card',
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<TaskCardDto> {
        return this.taskService.getById({ id });
    }

    @ApiOperation({ summary: 'Get all comments for a specific task card by its ID' })
    @ApiOkArrayResponse(CommentDto)
    @Get(':id/comments')
    @UseGuards(AuthGuard)
    async getComments(@Param('id', ParseIntPipe) taskcardId: number) {
        return mapToArrayResponse(
            await this.commentService.getAllByTaskCardId({ taskcardId }),
        );
    }

    @ApiOperation({ summary: 'Take a task card by its ID' })
    @ApiOkResponse({
        description: 'Successfully took a task card',
    })
    @Post(':id/take')
    @UseGuards(AuthGuard)
    async takeCard(@Req() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;

        const res = await this.taskService.takeCard({ userId, id });

        if (!res) {
            throw new BadRequestException(
                `Failed to take task card with id ${id}`,
            );
        }
    }

    @ApiOperation({ summary: 'Give up a task card by its ID' })
    @ApiOkResponse({
        description: 'Successfully gave up task card',
    })
    @Post(':id/giveup')
    @UseGuards(AuthGuard)
    async giveUpCard(@Req() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;

        const res = await this.taskService.giveUpCard({ userId, id });

        if (!res) {
            throw new BadRequestException(
                `Failed to give up task card with id ${id}`,
            );
        }
    }

    @ApiOperation({ summary: 'Create a comment for a specific task card' })
    @ApiOkResponse({
        type: CommentDto,
        description: 'Successfully created comment',
    })
    @Post(':id/comments')
    @UseGuards(AuthGuard)
    async createComment(
        @Req() req,
        @Param('id', ParseIntPipe) taskcardId: number,
        @Body() dto: CommentCreateDto,
    ): Promise<CommentDto> {
        const creatorId = req.user.sub;

        return this.commentService.create({
            data: dto,
            creatorId,
            taskcardId,
        });
    }

    @ApiOperation({ summary: 'Update a specific task card by its ID' })
    @ApiOkResponse({
        type: TaskCardDto,
        description: 'Successfully updated task card',
    })
    @Patch(':id')
    @UseGuards(AuthGuard, RightGuardTaskCard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TaskCardUpdateDto,
    ): Promise<TaskCardDto> {
        return this.taskService.update({ data: dto, id });
    }

    @ApiOperation({ summary: 'Delete a specific task card by its ID' })
    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: TaskCardDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardTaskCard)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<TaskCardDto> {
        const res = await this.taskService.delete({ id });

        if (!res) {
            throw new BadRequestException(
                `Failed to delete task card with id {id}`,
            );
        }

        return res;
    }
}
