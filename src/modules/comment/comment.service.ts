import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CreateCommentReqDto } from './dtos/req/create-comment.dto';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentFactory: CommentFactory,
        private readonly commentRepository: CommentRepository,
    ) {}

    async createComment(
        createCommentReqDto: CreateCommentReqDto,
    ): Promise<void> {
        const comment: IComment =
            await this.commentFactory.create(createCommentReqDto);
        await this.commentRepository.save(comment);
        return;
    }

    async getComments(
        paginationDto: PaginationDto,
    ): Promise<GetCommentListResDto> {
        const [comments, counts] =
            await this.commentRepository.findMany(paginationDto);
        return new GetCommentListResDto(comments, counts);
    }
}
