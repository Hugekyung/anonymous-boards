import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { GetBoardListDto } from '../dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from '../dtos/req/update-board.req.dto';
import { GetBoardListResDto } from '../dtos/res/get-board-list.res.dto';
import { BoardFactory } from '../factories/board.factory';
import { IBoard } from '../interfaces/board.interface';
import { BoardRepository } from '../repositories/board.repository';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardFactory: BoardFactory,
        private readonly boardRepository: BoardRepository,
    ) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<void> {
        const board: IBoard = await this.boardFactory.create(createBoardDto);
        return await this.boardRepository.save(board);
    }

    async getBoards(
        getBoardListDto: GetBoardListDto,
    ): Promise<GetBoardListResDto> {
        const [boards, counts] =
            await this.boardRepository.findall(getBoardListDto);
        return { resultCode: 1, data: { boards, counts } };
    }

    async updateBoard(boardId: number, updateBoardDto: UpdateBoardDto) {
        return;
    }
}
