import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ColumnDto } from './dto/column.dto';
import { ColumnService } from '../column/column.service';
import { RightGuardColumn } from '../auth/guard/right.guard.column';
import { TaskCardDto } from 'src/taskCard/dto/task-card.dto';
import { TaskCardCreateDto } from 'src/taskCard/dto/task-card.create.dto';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { ApiOkArrayResponse } from 'src/common/swagger.utils';
import { ArrayResponse, mapToArrayResponse } from 'src/common/array.response';
import { ColumnUpdateDto } from './dto/column.update.dto';
import { ColumnCreateDto } from './dto/column.create.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Columns')
@Controller('columns')
export class ColumnController {
    constructor(
        private readonly columnService: ColumnService,
        private readonly taskService: TaskCardService,
    ) {}

    @ApiOperation({ summary: 'Get a column by ID' })
    @ApiOkResponse({
        description: 'Successfully retrieved the column',
        type: ColumnDto,
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<ColumnDto> {
        return this.columnService.getById({ id });
    }

    @ApiOperation({ summary: 'Get all columns for the authenticated user' })
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

    @ApiOperation({ summary: 'Get all task cards for a column by column ID' })
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

    @ApiOperation({ summary: 'Create a new column' })
    @ApiOkResponse({
        description: 'Successfully created the column',
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

    @ApiOperation({
        summary: 'Update a column by ID',
    })
    @ApiOkResponse({
        description: 'Successfully updated the column',
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

    @ApiOperation({
        summary: 'Delete a column by ID',
    })
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

    @ApiOperation({
        summary:
            'Create a task card within a column for the authenticated user',
    })
    @ApiOkResponse({
        description: 'Successfully created the task card',
        type: TaskCardDto,
    })
    @Post(':id/taskcards')
    @UseGuards(AuthGuard)
    async createTask(
        @Req() req,
        @Body() dto: TaskCardCreateDto,
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
