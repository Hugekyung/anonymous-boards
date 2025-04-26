import { Comment } from '../../comment/comment.entity';

export interface IBoard {
    id: number;
    title: string;
    content: string;
    authorName: string;
    password: string;
    comments?: Comment[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
