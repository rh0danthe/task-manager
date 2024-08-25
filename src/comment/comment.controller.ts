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
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CommentService } from './comment.service';
import { RightGuardComment } from 'src/auth/guard/right.guard.comment';
import { CommentRequestDto } from './dto/comment-request.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { TaskCardService } from 'src/taskCard/task-card.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('taskcards')
@Controller('taskcards')
export class CommentController {
    constructor(private readonly commentService: CommentService,
        private readonly taskService: TaskCardService) {}

    @ApiOkResponse({
        type: CommentResponseDto,
    })
    @Get('created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req): Promise<CommentResponseDto[]> {
        const id = req.user.sub;

        return this.commentService.getAllByCreatorId({ creatorId: id });
    }

    @ApiOkResponse({
        type: CommentResponseDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<CommentResponseDto> {
        return this.commentService.getById({ id });
    }

    @ApiOkResponse({
        type: CommentResponseDto,
    })
    @Put(':id')
    @UseGuards(AuthGuard, RightGuardComment)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CommentRequestDto,
    ): Promise<CommentResponseDto> {
        return this.commentService.update({ data: dto, id });
    }

    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: CommentResponseDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardComment)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<CommentResponseDto> {
        const res = await this.commentService.delete({ id });

        if (!res) {
            throw new BadRequestException(
                `Failed to delete task card with id {id}`,
            );
        }

        return res;
    }
}
