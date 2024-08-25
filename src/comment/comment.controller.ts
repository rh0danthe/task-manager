import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CommentService } from './comment.service';
import { RightGuardComment } from 'src/auth/guard/right.guard.comment';
import { CommentDto } from './dto/comment.dto';
import { ApiOkArrayResponse } from 'src/common/swagger.utils';
import { ArrayResponse, mapToArrayResponse } from 'src/common/array.response';
import { CommentUpdateDto } from './dto/comment.update.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('taskcards')
@Controller('taskcards')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOkArrayResponse(CommentDto)
    @Get('created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req): Promise<ArrayResponse<CommentDto>> {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.commentService.getAllByCreatorId({ creatorId: id }),
        );
    }

    @ApiOkResponse({
        type: CommentDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
        return this.commentService.getById({ id });
    }

    @ApiOkResponse({
        type: CommentDto,
    })
    @Put(':id')
    @UseGuards(AuthGuard, RightGuardComment)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CommentUpdateDto,
    ): Promise<CommentDto> {
        return this.commentService.update({ data: dto, id });
    }

    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: CommentDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardComment)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
        const res = await this.commentService.delete({ id });

        if (!res) {
            throw new BadRequestException(
                `Failed to delete task card with id {id}`,
            );
        }

        return res;
    }
}
