import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from '../board/board.repository';
import { IBoard } from '../board/interfaces/board.interface';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/req/create-comment.dto';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentFactory {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly commentRepository: CommentRepository,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<IComment> {
        let board: IBoard | null = null;
        let comment: IComment | null = null;

        if (createCommentDto.boardId) {
            board = await this.boardRepository.findOneById(
                createCommentDto.boardId,
            );
            if (!board) {
                throw new NotFoundException('해당 게시글이 없습니다.');
            }
        } else if (createCommentDto.commentId) {
            comment = await this.commentRepository.findOneById(
                createCommentDto.commentId,
            );
            if (!comment) {
                throw new NotFoundException('해당 댓글이 없습니다.');
            }
        }

        const newComment: IComment = this.commentRepository.create({
            content: createCommentDto.content,
            authorName: createCommentDto.authorName,
            board: board ?? null,
            comment: comment ?? null,
        });

        return newComment;
    }
}
