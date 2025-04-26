import { UpdateBoardDto } from './dtos/req/update-board.req.dto';
import { IBoard } from './interfaces/board.interface';

export class BoardUpdater {
    static async apply(board: IBoard, dto: UpdateBoardDto): Promise<IBoard> {
        if (dto.title) {
            board.title = dto.title;
        }
        if (dto.content) {
            board.content = dto.content;
        }
        return board;
    }
}
