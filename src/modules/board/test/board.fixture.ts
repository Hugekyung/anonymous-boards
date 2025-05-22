import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { UpdateBoardDto } from '../dtos/req/update-board.req.dto';
import { IBoard } from '../interfaces/board.interface';

export class BoardFixture {
    static existingBoard(): IBoard {
        return {
            id: 1,
            title: '기존 제목',
            content: '기존 내용',
            authorName: 'yang',
            password: '1234',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }

    static createBoard(): CreateBoardDto {
        return {
            title: '테스트 제목',
            content: '테스트 내용',
            authorName: '양해찬',
            password: '1234',
        };
    }

    static updateDto(password = '1234'): UpdateBoardDto {
        return {
            password,
            title: '수정된 제목',
        };
    }
}
