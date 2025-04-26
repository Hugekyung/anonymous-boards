import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { GetBoardListDto } from './dtos/req/get-board-list.req.dto';
import { IBoard } from './interfaces/board.interface';

export class BoardRepository {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<IBoard>,
    ) {}

    create(createBoardDto: CreateBoardDto): IBoard {
        return this.boardRepository.create(createBoardDto);
    }

    async findall(
        getBoardListDto: GetBoardListDto,
    ): Promise<[IBoard[], number]> {
        const { page, perPage } = getBoardListDto;
        const query = this.boardRepository.createQueryBuilder();

        if (getBoardListDto.title) {
            query.andWhere('title LIKE :title', {
                title: `%${getBoardListDto.title}%`,
            });
        } else {
            query.andWhere('authorName = :authorName', {
                authorName: getBoardListDto.authorName,
            });
        }

        return await query
            .skip(page * perPage)
            .take(perPage)
            .getManyAndCount();
    }

    async findOneById(boardId: number): Promise<IBoard | null> {
        return await this.boardRepository
            .createQueryBuilder()
            .where('id = :boardId', { boardId })
            .getOne();
    }

    async save(board: IBoard): Promise<void> {
        await this.boardRepository.save(board);
    }

    async softDelete(boardId: number): Promise<void> {
        await this.boardRepository
            .createQueryBuilder()
            .softDelete()
            .where('id = :boardId', { boardId })
            .execute();
        return;
    }
}
