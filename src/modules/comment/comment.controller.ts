import { Controller, Get, Post, Query } from '@nestjs/common';
import { NotifyKeywords } from 'src/common/decorators/notify-keywords.decorator';
import { KeywordType } from 'src/common/enum';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/req/create-comment.dto';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @NotifyKeywords(KeywordType.COMMENT)
    async createComment(
        createCommentDto: CreateCommentDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.commentService.createComment(createCommentDto),
        );
    }

    @Get()
    async getComments(
        @Query() page: number,
        @Query() perPage: number,
    ): Promise<ApiResponseDto<GetCommentListResDto>> {
        return ApiResponseDto.ok(
            await this.commentService.getComments(page, perPage),
        );
    }
}
