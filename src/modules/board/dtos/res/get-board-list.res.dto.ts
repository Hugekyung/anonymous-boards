import { IBoard } from '../../interfaces/board.interface';

export class GetBoardListResDto {
    private readonly boards: IBoard[];
    private readonly counts: number;

    constructor(boards: IBoard[], counts: number) {
        this.boards = boards;
        this.counts = counts;
    }
}
