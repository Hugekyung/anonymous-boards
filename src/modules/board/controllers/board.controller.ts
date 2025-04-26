import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { GetBoardListDto } from '../dtos/get-board-list.dto';
import { IBoard } from '../interfaces/board.interface';
import { BoardService } from '../services/board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
        return await this.boardService.createBoard(createBoardDto);
    }

    @Get()
    async getBoards(
        @Body() getBoardListDto: GetBoardListDto,
    ): Promise<[IBoard[], number]> {
        return await this.boardService.getBoards(getBoardListDto);
    }
}
