import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { GetBoardListDto } from '../dtos/get-board-list.dto';
import { BoardFactory } from '../factories/board.factory';
import { IBoard } from '../interfaces/board.interface';
import { BoardRepository } from '../repositories/board.repository';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardFactory: BoardFactory,
        private readonly boardRepository: BoardRepository,
    ) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<IBoard> {
        const board: IBoard = await this.boardFactory.create(createBoardDto);
        return await this.boardRepository.save(board);
    }

    async getBoards(
        getBoardListDto: GetBoardListDto,
    ): Promise<[IBoard[], number]> {
        return await this.boardRepository.findall(getBoardListDto);
    }
}
