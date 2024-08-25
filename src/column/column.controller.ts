import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ColumnDto } from './dto/column.dto';
import { ColumnService } from '../column/column.service';
import { RightGuardColumn } from '../auth/guard/right.guard.column';
import { TaskCardDto } from 'src/taskCard/dto/task-card.dto';
import { TaskCardCreateRequestDto } from 'src/taskCard/dto/task-card.create-request.dto';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { ApiOkArrayResponse } from 'src/common/swagger.utils';
import { ArrayResponse, mapToArrayResponse } from 'src/common/array.response';
import { ColumnUpdateDto } from './dto/column.update.dto';
import { ColumnCreateDto } from './dto/column.create.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('columns')
@Controller('columns')
export class ColumnController {
    constructor(
        private readonly columnService: ColumnService,
        private readonly taskService: TaskCardService,
    ) {}

    @ApiOkResponse({
        type: ColumnDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<ColumnDto> {
        return this.columnService.getById({ id });
    }

    @ApiOkArrayResponse(ColumnDto)
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Req() req): Promise<ArrayResponse<ColumnDto>> {
        const id = req.user.sub;

        return mapToArrayResponse(
            await this.columnService.getAllByCreatorId({
                creatorId: id,
            }),
        );
    }

    @ApiOkArrayResponse(TaskCardDto)
    @Get(':id/taskcards')
    @UseGuards(AuthGuard)
    async getAllTaskCards(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArrayResponse<TaskCardDto>> {
        return mapToArrayResponse(
            await this.taskService.getAllByColumnId({ columnId: id }),
        );
    }

    @ApiOkResponse({
        type: ColumnDto,
    })
    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req, @Body() dto: ColumnCreateDto): Promise<ColumnDto> {
        const id = req.user.sub;

        const column = await this.columnService.create({
            data: dto,
            creatorId: id,
        });

        return column;
    }

    @ApiOkResponse({
        type: ColumnDto,
    })
    @Put(':id')
    @UseGuards(AuthGuard, RightGuardColumn)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ColumnUpdateDto,
    ): Promise<ColumnDto> {
        return this.columnService.update({ data: dto, id });
    }

    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: ColumnDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardColumn)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ColumnDto> {
        const res = await this.columnService.delete({ id });

        if (!res) {
            throw new BadRequestException(
                `Failed to delete column with id {id}`,
            );
        }

        return res;
    }

    @ApiOkResponse({
        type: TaskCardDto,
    })
    @Post(':id/taskcards')
    @UseGuards(AuthGuard)
    async createTask(
        @Req() req,
        @Body() dto: TaskCardCreateRequestDto,
        @Param('id', ParseIntPipe) columnId: number,
    ): Promise<TaskCardDto> {
        const id = req.user.sub;

        const card = await this.taskService.create({
            data: dto,
            creatorId: id,
            columnId,
        });

        return card;
    }
}
