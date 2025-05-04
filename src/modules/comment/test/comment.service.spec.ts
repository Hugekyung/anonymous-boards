import { Test, TestingModule } from '@nestjs/testing';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CommentFactory } from '../comment.factory';
import { CommentRepository } from '../comment.repository';
import { CommentService } from '../comment.service';
import { IComment } from '../interfaces/comment.interface';

type MockType<T> = {
    [P in keyof T]?: jest.Mock;
};

describe('CommentService 🧪', () => {
    let service: CommentService;
    let mockFactory: MockType<CommentFactory>;
    let mockRepo: MockType<CommentRepository>;

    beforeEach(async () => {
        mockFactory = { create: jest.fn() };
        mockRepo = {
            create: jest.fn(),
            findOneById: jest.fn(),
            findMany: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentService,
                { provide: CommentFactory, useValue: mockFactory },
                { provide: CommentRepository, useValue: mockRepo },
            ],
        }).compile();

        service = module.get<CommentService>(CommentService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('createComment: 댓글을 생성한다', async () => {
        // given
        const fakeComment: IComment = {
            id: 1,
            content: '테스트 댓글',
            authorName: '양해찬',
            createdAt: new Date(),
            boardId: 1,
        };
        mockFactory.create!.mockResolvedValue(fakeComment);
        mockRepo.save!.mockResolvedValue(undefined);

        // when
        await service.createComment(fakeComment);

        // then
        expect(mockFactory.create).toHaveBeenCalledWith(fakeComment);
        expect(mockRepo.save).toHaveBeenCalledWith(fakeComment);
    });

    it('getComments: 댓글 목록을 가져온다', async () => {
        // given
        const paginationDto: PaginationDto = {
            page: 1,
            perPage: 10,
        };
        const mockedComments: IComment[] = [
            {
                id: 1,
                content: '테스트 댓글',
                authorName: '양해찬',
                createdAt: new Date(),
                boardId: 1,
            },
            {
                id: 2,
                content: '테스트 댓글2',
                authorName: '양해찬',
                createdAt: new Date(),
                boardId: 2,
            },
        ];
        const count = 2;
        mockRepo.findMany!.mockResolvedValue([mockedComments, count]);

        // when
        const result = await service.getComments(paginationDto);

        // then
        expect(result.comments).toEqual(mockedComments);
        expect(result.counts).toBe(count);
    });
});
