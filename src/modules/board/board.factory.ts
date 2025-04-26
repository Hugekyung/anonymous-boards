import { Injectable } from '@nestjs/common';
import { PasswordUtil } from 'src/common/utils/password.utils';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { IBoard } from './interfaces/board.interface';

@Injectable()
export class BoardFactory {
    constructor(private readonly boardRepository: BoardRepository) {}

    async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
        const hashedPassword: string = await PasswordUtil.generateHash(
            createBoardDto.password,
        );
        const board = this.boardRepository.create({
            ...createBoardDto,
            password: hashedPassword,
        });
        return board;
    }
}
