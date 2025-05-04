import { IComment } from 'src/modules/comment/interfaces/comment.interface';

export interface IBoard {
    id: number;
    title: string;
    content: string;
    authorName: string;
    password: string;
    comments?: IComment[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
