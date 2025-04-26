import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { Board } from '../entities/board.entity';
import { IBoard } from '../interfaces/board.interface';

export class BoardRepository {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<IBoard>,
    ) {}

    create(createBoardDto: CreateBoardDto): IBoard {
        return this.boardRepository.create(createBoardDto);
    }

    async save(board: IBoard): Promise<IBoard> {
        return await this.boardRepository.save(board);
    }
}
