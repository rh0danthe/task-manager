import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/guard/auth.guard";
import {ColumnResponseDto} from "../column/dto/column-response.dto";
import {ColumnService} from "../column/column.service";
import {ColumnRequestDto} from "./dto/column-request.dto";
import {RightGuardColumn} from "../auth/guard/right.guard.column";

@ApiBearerAuth('JWT-auth')
@ApiTags("columns")
@Controller('columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @ApiOkResponse({
        type: ColumnResponseDto
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getById(@Param('id', ParseIntPipe) id: number): Promise<ColumnResponseDto> {

        return this.columnService.getById({id});
    }

    @ApiOkResponse({
        type: ColumnResponseDto
    })
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Req() req): Promise<ColumnResponseDto[]> {
        const id = req.user.sub;

        return this.columnService.getAllByCreatorId({creatorId: id});
    }

    @ApiOkResponse({
        type: ColumnResponseDto
    })
    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req, @Body() dto: ColumnRequestDto): Promise<ColumnResponseDto> {
        const id = req.user.sub;

        const column = await this.columnService.create({data: dto, creatorId: id });

        return column;
    }

    @ApiOkResponse({
        type: ColumnResponseDto
    })
    @Put(":id")
    @UseGuards(AuthGuard, RightGuardColumn)
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ColumnRequestDto): Promise<ColumnResponseDto> {

        return this.columnService.update({data: dto, id});
    }

    @ApiOkResponse({
        description: 'Column successfully deleted',
        type: ColumnResponseDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard, RightGuardColumn)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ColumnResponseDto> {
        const res = await this.columnService.delete({ id });

        if (!res) {
            throw new BadRequestException(`Failed to delete column with id {id}`);
        }

        return res;
    }
}