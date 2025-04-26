import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenDigestPwd } from 'src/common/utils/crypto.utils';
import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { IBoard } from '../interfaces/board.interface';
import { BoardRepository } from '../repositories/board.repository';

@Injectable()
export class BoardFactory {
    constructor(
        private readonly config: ConfigService,
        private readonly boardRepository: BoardRepository,
    ) {}

    async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
        const hashedPassword: string = GenDigestPwd(createBoardDto.password);
        const board = this.boardRepository.create({
            ...createBoardDto,
            password: hashedPassword,
        });
        return board;
    }
}
