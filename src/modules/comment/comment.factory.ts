import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BoardRepository } from '../board/board.repository';
import { IBoard } from '../board/interfaces/board.interface';
import { CommentRepository } from './comment.repository';
import { CreateCommentReqDto } from './dtos/req/create-comment.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentFactory {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly commentRepository: CommentRepository,
    ) {}

    async create(createCommentReqDto: CreateCommentReqDto): Promise<IComment> {
        let board: IBoard | null = null;
        let comment: IComment | null = null;

        if (createCommentReqDto.boardId) {
            board = await this.boardRepository.findOneById(
                createCommentReqDto.boardId,
            );
            if (!board) {
                throw new NotFoundException('해당 게시글이 없습니다.');
            }
        } else if (createCommentReqDto.commentId) {
            comment = await this.commentRepository.findOneById(
                createCommentReqDto.commentId,
            );
            if (!comment) {
                throw new BadRequestException('해당 댓글이 없습니다.');
            }
            if (comment.parentId) {
                throw new BadRequestException(
                    '댓글의 댓글까지만 작성할 수 있습니다.',
                );
            }
        }

        const newComment: IComment = this.commentRepository.create({
            content: createCommentReqDto.content,
            authorName: createCommentReqDto.authorName,
            board: board ?? null,
            parent: comment ?? null,
        });

        return newComment;
    }
}
