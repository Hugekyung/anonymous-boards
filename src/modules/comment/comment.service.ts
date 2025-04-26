import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

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

    async createComment() {}
}
