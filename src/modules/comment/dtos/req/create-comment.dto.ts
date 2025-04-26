import { IBoard } from 'src/modules/board/interfaces/board.interface';
import { IComment } from '../../interfaces/comment.interface';

export class CreateCommentDto {
    boardId?: number;
    commentId?: number;
    board?: IBoard | null;
    comment?: IComment | null;
    content: string;
    authorName: string;
}
