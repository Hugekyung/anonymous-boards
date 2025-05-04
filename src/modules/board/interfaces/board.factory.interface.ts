import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { IBoard } from './board.interface';

export interface IBoardFactory {
    create(createBoardDto: CreateBoardDto): Promise<IBoard>;
}
