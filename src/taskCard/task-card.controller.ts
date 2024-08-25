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
import { TaskCardResponseDto } from './dto/task-card.response.dto';
import { TaskCardService } from './task-card.service';
import { RightGuardTaskCard } from 'src/auth/guard/right.guard.task-card';
import { TaskCardUpdateRequestDto } from './dto/task-card.update-request.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('taskcards')
@Controller('taskcards')
export class TaskCardController {
    constructor(private readonly taskService: TaskCardService) {}

    @ApiOkResponse({
        type: TaskCardResponseDto,
    })
    @Get('created')
    @UseGuards(AuthGuard)
    async getCreatedCards(@Req() req): Promise<TaskCardResponseDto[]> {
        const id = req.user.sub;

        return this.taskService.getAllByCreatorId({ creatorId: id });
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
        isArray: true,
    })
    @Get('executing')
    @UseGuards(AuthGuard)
    async getExecutingCards(@Req() req) {
        const id = req.user.sub;

        return this.taskService.getCardsByUserExecuting({ userId: id });
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<TaskCardResponseDto> {
        return this.taskService.getById({ id });
    }

    @ApiOkResponse({
        description: 'Successfully took a task card',
    })
    @Post(':id/take')
    @UseGuards(AuthGuard)
    async takeCard(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<HttpStatus> {
        const userId = req.user.sub;

        const res = await this.taskService.takeCard({ userId, id });

        if (!res) {
            throw new BadRequestException(
                `Failed to take task card with id ${id}`,
            );
        }

        return HttpStatus.OK;
    }

    @ApiOkResponse({
        description: 'Successfully gave up task card',
    })
    @Post(':id/giveup')
    @UseGuards(AuthGuard)
    async giveUpCard(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<HttpStatus> {
        const userId = req.user.sub;

        const res = await this.taskService.giveUpCard({ userId, id });

        if (!res) {
            throw new BadRequestException(
                `Failed to give up task card with id ${id}`,
            );
        }

        return HttpStatus.OK;
    }

    @ApiOkResponse({
        type: TaskCardResponseDto,
    })
    @Patch(':id')
    @UseGuards(AuthGuard, RightGuardTaskCard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TaskCardUpdateRequestDto,
    ): Promise<TaskCardResponseDto> {
        return this.taskService.update({ data: dto, id });
    }

    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: TaskCardResponseDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardTaskCard)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<TaskCardResponseDto> {
        const res = await this.taskService.delete({ id });

        if (!res) {
            throw new BadRequestException(
                `Failed to delete task card with id {id}`,
            );
        }

        return res;
    }
}
