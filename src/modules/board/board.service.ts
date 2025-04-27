import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordUtil } from 'src/common/utils/password.utils';
import { BoardFactory } from './board.factory';
import { BoardRepository } from './board.repository';
import { BoardUpdater } from './board.updater';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { DeleteBoardDto } from './dtos/req/delete-board.req.dto';
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
        return new GetBoardListResDto(boards, counts);
    }

    async updateBoard(
        boardId: number,
        updateBoardDto: UpdateBoardDto,
    ): Promise<void> {
        const board = await this.checkExistBoard(boardId);
        const hashedPassword: string = await PasswordUtil.generateHash(
            updateBoardDto.password,
        );
        await this.verifyPassword(board.password, hashedPassword);
        const updatedBoard = await BoardUpdater.apply(board, updateBoardDto);
        return await this.boardRepository.save(updatedBoard);
    }

    async deleteBoard(
        boardId: number,
        deleteBoardDto: DeleteBoardDto,
    ): Promise<void> {
        const board = await this.checkExistBoard(boardId);
        const hashedPassword: string = await PasswordUtil.generateHash(
            deleteBoardDto.password,
        );
        await this.verifyPassword(board.password, hashedPassword);
        return await this.boardRepository.softDelete(boardId);
    }

    private async checkExistBoard(boardId: number): Promise<IBoard> {
        const board = await this.boardRepository.findOneById(boardId);
        if (!board) {
            throw new BadRequestException('게시글이 존재하지 않습니다.');
        }

        return board;
    }

    private async verifyPassword(
        password: string,
        hashedPassword: string,
    ): Promise<void> {
        if (await PasswordUtil.verify(password, hashedPassword)) {
            throw new BadRequestException('비밀번호가 일치하지 않습니다.');
        }
        return;
    }
}
