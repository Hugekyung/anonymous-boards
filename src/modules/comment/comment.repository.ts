import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dtos/req/create-comment.dto';
import { IComment } from './interfaces/comment.interface';

export class CommentRepository {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<IComment>,
    ) {}

    create(createCommentDto: CreateCommentDto): IComment {
        return this.commentRepository.create(createCommentDto);
    }

    async findOneById(commentId: number): Promise<IComment | null> {
        return await this.commentRepository
            .createQueryBuilder()
            .where('id = :commentId', { commentId })
            .getOne();
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

    async save(comment: IComment): Promise<void> {
        await this.commentRepository.save(comment);
        return;
    }
}
