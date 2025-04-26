import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { IComment } from './interfaces/comment.interface';

export class CommentRepository {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<IComment>,
    ) {}

    create(): IComment {
        return this.commentRepository.create();
    }

    async findMany(
        page: number,
        perPage: number,
    ): Promise<[IComment[], number]> {
        return await this.commentRepository
            .createQueryBuilder()
            .skip((page - 1) * perPage)
            .take(perPage)
            .getManyAndCount();
    }

    async save(comment: IComment): Promise<IComment> {
        return await this.commentRepository.save(comment);
    }
}
