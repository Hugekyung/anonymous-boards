import { IComment } from '../../interfaces/comment.interface';

export class GetCommentListResDto {
    readonly comments: IComment[];
    readonly counts: number;

    constructor(comments: IComment[], counts: number) {
        this.comments = comments;
        this.counts = counts;
    }
}
