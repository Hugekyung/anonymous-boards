import { IBoard } from '../../interfaces/board.interface';

export class GetBoardListResDto {
    readonly boards: IBoard[];
    readonly counts: number;

    constructor(boards: IBoard[], counts: number) {
        this.boards = boards;
        this.counts = counts;
    }
}
