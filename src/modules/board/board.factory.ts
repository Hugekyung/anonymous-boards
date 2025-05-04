import { Injectable } from '@nestjs/common';
import { PasswordUtil } from '../../common/utils/password.utils';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { IBoardFactory } from './interfaces/board.factory.interface';
import { IBoard } from './interfaces/board.interface';
import { IBoardRepository } from './interfaces/board.repository.interface';

@Injectable()
export class BoardFactory implements IBoardFactory {
    constructor(private readonly boardRepository: IBoardRepository) {}

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
