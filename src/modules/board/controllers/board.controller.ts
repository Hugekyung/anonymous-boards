import { Body, Controller, Post } from '@nestjs/common';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { IBoard } from '../interfaces/board.interface';
import { BoardService } from '../services/board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
        return await this.boardService.createBoard(createBoardDto);
    }
}
