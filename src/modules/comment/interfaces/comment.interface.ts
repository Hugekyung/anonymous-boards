import { IBoard } from 'src/modules/board/interfaces/board.interface';

export interface IComment {
    id: number;
    content: string;
    authorName: string;
    createdAt: Date;
    parentId?: number;
    parent?: IComment | null;
    children?: IComment[];
    boardId?: number;
    board?: IBoard | null;
}
