import { IBoard } from 'src/modules/board/interfaces/board.interface';

export interface IComment {
    id: number;
    content: string;
    authorName: string;
    createdAt: Date;
    parent: IComment;
    children: IComment[];
    board: IBoard;
}
