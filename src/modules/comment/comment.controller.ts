import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotifyKeywords } from 'src/common/decorators/notify-keywords.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { KeywordType } from 'src/common/enum';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { CommentService } from './comment.service';
import { CreateCommentReqDto } from './dtos/req/create-comment.dto';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';

@ApiTags('댓글')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @NotifyKeywords(KeywordType.COMMENT)
    async createComment(
        @Body() createCommentReqDto: CreateCommentReqDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.commentService.createComment(createCommentReqDto),
        );
    }

    @Get()
    async getComments(
        @Query() paginationDto: PaginationDto,
    ): Promise<ApiResponseDto<GetCommentListResDto>> {
        return ApiResponseDto.ok(
            await this.commentService.getComments(paginationDto),
        );
    }
}
