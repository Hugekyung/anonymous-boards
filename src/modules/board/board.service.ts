import { Injectable } from '@nestjs/common';
import { PasswordUtil } from 'src/common/utils/password.utils';
import { BoardFactory } from './board.factory';
import { BoardRepository } from './board.repository';
import { BoardUpdater } from './board.updater';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { GetBoardListDto } from './dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from './dtos/req/update-board.req.dto';
import { GetBoardListResDto } from './dtos/res/get-board-list.res.dto';
import { IBoard } from './interfaces/board.interface';

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
        const board = await this.boardRepository.findOneById(boardId);
        if (!board) {
            return new Error('게시글이 존재하지 않습니다.');
        }
        const hashedPassword: string = await PasswordUtil.generateHash(
            updateBoardDto.password,
        );
        if (await PasswordUtil.verify(board.password, hashedPassword)) {
            return new Error('비밀번호가 일치하지 않습니다.');
        }
        const updatedBoard = await BoardUpdater.apply(board, updateBoardDto);
        return await this.boardRepository.save(updatedBoard);
    }
}
