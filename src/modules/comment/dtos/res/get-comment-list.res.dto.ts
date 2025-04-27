import { IComment } from '../../interfaces/comment.interface';

export class GetCommentListResDto {
    private readonly comments: IComment[];
    private readonly counts: number;

    constructor(comments: IComment[], counts: number) {
        this.comments = comments;
        this.counts = counts;
    }
}
