import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { DeleteBoardDto } from '../dtos/req/delete-board.req.dto';
import { GetBoardListDto } from '../dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from '../dtos/req/update-board.req.dto';
import { GetBoardListResDto } from '../dtos/res/get-board-list.res.dto';

export interface IBoardService {
    createBoard(createBoardDto: CreateBoardDto): Promise<void>;
    getBoards(getBoardListDto: GetBoardListDto): Promise<GetBoardListResDto>;
    updateBoard(boardId: number, updateBoardDto: UpdateBoardDto): Promise<void>;
    deleteBoard(boardId: number, deleteBoardDto: DeleteBoardDto): Promise<void>;
}
