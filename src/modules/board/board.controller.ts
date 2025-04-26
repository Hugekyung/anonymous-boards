import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { GetBoardListDto } from './dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from './dtos/req/update-board.req.dto';
import { GetBoardListResDto } from './dtos/res/get-board-list.res.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.boardService.createBoard(createBoardDto),
        );
    }

    @Get()
    async getBoards(
        @Body() getBoardListDto: GetBoardListDto,
    ): Promise<ApiResponseDto<GetBoardListResDto>> {
        return ApiResponseDto.ok(
            await this.boardService.getBoards(getBoardListDto),
        );
    }

    @Patch(':boardId')
    async updateBoard(
        @Param('boardId') boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return ApiResponseDto.ok(
            await this.boardService.updateBoard(boardId, updateBoardDto),
        );
    }
}
