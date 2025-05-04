import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { GetBoardListDto } from '../dtos/req/get-board-list.req.dto';
import { IBoard } from './board.interface';

export interface IBoardRepository {
    create(createBoardDto: CreateBoardDto): IBoard;
    findall(getBoardListDto: GetBoardListDto): Promise<[IBoard[], number]>;
    findOneById(boardId: number): Promise<IBoard | null>;
    save(board: IBoard): Promise<void>;
    softDelete(boardId: number): Promise<void>;
}
