import { Injectable } from '@nestjs/common';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/req/create-comment.dto';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentFactory: CommentFactory,
        private readonly commentRepository: CommentRepository,
    ) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<void> {
        const comment: IComment =
            await this.commentFactory.create(createCommentDto);
        await this.commentRepository.save(comment);
        return;
    }

    async getComments(
        page: number,
        perPage: number,
    ): Promise<GetCommentListResDto> {
        const [comments, counts] = await this.commentRepository.findMany(
            page,
            perPage,
        );
        return { resultCode: 1, data: { comments, counts } };
    }
}
