import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
@ApiTags('taskcards')
@Controller('taskcards')
export class TaskCardController {
    constructor(
        private readonly taskService: TaskCardService,
        private readonly commentService: CommentService,
    ) {}

    @ApiOkArrayResponse(TaskCardDto)
    @Get('created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req): Promise<ArrayResponse<TaskCardDto>> {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.taskService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOkArrayResponse(TaskCardDto)
    @Get('executing')
    @UseGuards(AuthGuard)
    async getExecutingCards(@Req() req) {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.taskService.getCardsByUserExecuting({ userId: id }),
        );
    }

    @ApiOkResponse({
        type: TaskCardDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<TaskCardDto> {
        return this.taskService.getById({ id });
    }

    @ApiOkArrayResponse(CommentDto)
    @Get(':id/comments')
    @UseGuards(AuthGuard)
    async getComments(@Param('id', ParseIntPipe) taskcardId: number) {
        return mapToArrayResponse(
            await this.commentService.getAllByTaskCardId({ taskcardId }),
        );
    }

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

    @ApiOkResponse({
        type: CommentDto,
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

    @ApiOkResponse({
        type: TaskCardDto,
    })
    @Patch(':id')
    @UseGuards(AuthGuard, RightGuardTaskCard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TaskCardUpdateDto,
    ): Promise<TaskCardDto> {
        return this.taskService.update({ data: dto, id });
    }

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
