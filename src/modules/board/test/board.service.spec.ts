import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
    BoardFactoryToken,
    BoardRepositoryToken,
} from '../../../common/constants/token.constants';
import { PasswordUtil } from '../../../common/utils/password.utils';
import { BoardFactory } from '../board.factory';
import { BoardRepository } from '../board.repository';
import { BoardService } from '../board.service';
import { BoardUpdater } from '../board.updater';
import { CreateBoardDto } from '../dtos/req/create-board.req.dto';
import { DeleteBoardDto } from '../dtos/req/delete-board.req.dto';
import { GetBoardListDto } from '../dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from '../dtos/req/update-board.req.dto';
import { GetBoardListResDto } from '../dtos/res/get-board-list.res.dto';
import { IBoard } from '../interfaces/board.interface';
import { BoardFixture } from './board.fixture';

type MockType<T> = {
    [P in keyof T]?: jest.Mock;
};

describe('BoardService 🧪', () => {
    let service: BoardService;
    let mockFactory: MockType<BoardFactory>;
    let mockRepo: MockType<BoardRepository>;

    beforeEach(async () => {
        mockFactory = { create: jest.fn() };
        mockRepo = {
            create: jest.fn(),
            save: jest.fn(),
            findall: jest.fn(),
            findOneById: jest.fn(),
            softDelete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                { provide: BoardFactoryToken, useValue: mockFactory },
                { provide: BoardRepositoryToken, useValue: mockRepo },
            ],
        }).compile();

        service = module.get<BoardService>(BoardService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('1. createBoard: BoardFactory.create 후 저장 호출 ✅', async () => {
        const createDto: CreateBoardDto = BoardFixture.createBoard();
        mockFactory.create!.mockResolvedValue(createDto);
        mockRepo.save!.mockResolvedValue(undefined);

        await service.createBoard(createDto);

        expect(mockFactory.create).toHaveBeenCalledWith(createDto);
        expect(mockRepo.save).toHaveBeenCalledWith(createDto);
    });

    it('2. getBoards: repository 결과가 DTO로 래핑되어 반환되어야 함 ✅', async () => {
        const mockedBoards: CreateBoardDto[] = [
            {
                title: '테스트 제목',
                content: '테스트 내용',
                authorName: '양해찬',
                password: '1234',
            },
            {
                title: '테스트 제목2',
                content: '테스트 내용2',
                authorName: '양해찬',
                password: '1234',
            },
        ];
        const count = 2;
        mockRepo.findall!.mockResolvedValue([mockedBoards, count]);

        const requestBody: GetBoardListDto = {
            page: 1,
            perPage: 10,
        };
        const result = await service.getBoards(requestBody);

        expect(result).toBeInstanceOf(GetBoardListResDto);
        expect(result.boards).toEqual(mockedBoards);
        expect(result.counts).toBe(count);
    });

    describe('updateBoard 🚀', () => {
        const existingBoard: IBoard = makeFakeBoard({
            id: 1,
            title: 'test title 1',
            content: 'test content 1',
            authorName: 'yang',
            password: '1234',
        });
        const updateBoardDto: UpdateBoardDto = {
            password: '1234',
            title: 'new title',
        };
        const updateBoardDtoByWrongPassword: UpdateBoardDto = {
            password: 'wrong password',
            title: 'new title',
        };

        beforeEach(() => {
            mockRepo.findOneById!.mockResolvedValue(existingBoard);
            jest.spyOn(PasswordUtil, 'generateHash').mockResolvedValue(
                'newHash',
            );
            jest.spyOn(PasswordUtil, 'verify').mockResolvedValue(false);
            jest.spyOn(BoardUpdater, 'apply').mockResolvedValue({
                ...existingBoard,
                title: 'new title',
            });
            mockRepo.save!.mockResolvedValue(undefined);
        });

        it('3. 정상 흐름: 게시글 존재, 비밀번호 일치하면 업데이트 후 저장 ✅', async () => {
            await expect(
                service.updateBoard(1, updateBoardDto),
            ).resolves.toBeUndefined();
            expect(mockRepo.save).toHaveBeenCalledWith(
                expect.objectContaining({ title: 'new title' }),
            );
        });

        it('4. 게시글 없으면 예외 발생 ❌', async () => {
            mockRepo.findOneById!.mockResolvedValue(null);
            await expect(
                service.updateBoard(2, updateBoardDto),
            ).rejects.toThrow(BadRequestException);
        });

        it('5. 비밀번호 불일치 시 예외 발생 ❌', async () => {
            (PasswordUtil.verify as jest.Mock).mockResolvedValue(true);
            await expect(
                service.updateBoard(1, updateBoardDtoByWrongPassword),
            ).rejects.toThrow('비밀번호가 일치하지 않습니다.');
        });
    });

    describe('deleteBoard 🌱', () => {
        const existingBoard: IBoard = makeFakeBoard({
            id: 1,
            title: 'test title 1',
            content: 'test content 1',
            authorName: 'yang',
            password: '1234',
        });
        const deleteBoardId = 1;
        const deletedBoardDto: DeleteBoardDto = { password: '1234' };
        const deletedBoardDtoWIthWrongPassword: DeleteBoardDto = {
            password: 'wrong password',
        };

        beforeEach(() => {
            mockRepo.findOneById!.mockResolvedValue(existingBoard);
            jest.spyOn(PasswordUtil, 'generateHash').mockResolvedValue('1234');
            jest.spyOn(PasswordUtil, 'verify').mockResolvedValue(false);
            mockRepo.softDelete!.mockResolvedValue(undefined);
        });

        it('6. 정상 흐름: softDelete 호출 ✅', async () => {
            await expect(
                service.deleteBoard(deleteBoardId, deletedBoardDto),
            ).resolves.toBeUndefined();
            expect(mockRepo.softDelete).toHaveBeenCalledWith(1);
        });

        it('7. 게시글 없으면 예외 발생 ❌', async () => {
            mockRepo.findOneById!.mockResolvedValue(null);
            await expect(
                service.deleteBoard(2, deletedBoardDto),
            ).rejects.toThrow('게시글이 존재하지 않습니다.');
        });

        it('8. 비밀번호 불일치 시 예외 발생 ❌', async () => {
            (PasswordUtil.verify as jest.Mock).mockResolvedValue(true);
            await expect(
                service.deleteBoard(
                    deleteBoardId,
                    deletedBoardDtoWIthWrongPassword,
                ),
            ).rejects.toThrow('비밀번호가 일치하지 않습니다.');
        });
    });

    describe('checkExistBoard', () => {
        it('boardId를 파라미터로 요청하면 board를 응답한다', async () => {
            // when
            const boardId = 1;
        });
    });
});

function makeFakeBoard(overrides?: Partial<IBoard>): IBoard {
    return {
        id: 1,
        title: '제목',
        content: '내용',
        authorName: '작가',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        ...overrides,
    };
}
