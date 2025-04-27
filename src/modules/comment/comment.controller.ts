import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyKeywords } from 'src/common/decorators/notify-keywords.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { KeywordType } from 'src/common/enum';
import {
    ApiResponseDto,
    CommonResDto,
} from '../../common/dto/api-response.dto';
import { CommentService } from './comment.service';
import { CreateCommentReqDto } from './dtos/req/create-comment.dto';
import { GetCommentListResDto } from './dtos/res/get-comment-list.res.dto';

@ApiTags('댓글')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @NotifyKeywords(KeywordType.COMMENT)
    @ApiOperation({ summary: '댓글 생성' })
    @ApiResponse({
        status: 200,
        description: '댓글 생성 성공',
        type: CommonResDto,
    })
    async createComment(
        @Body() createCommentReqDto: CreateCommentReqDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.commentService.createComment(createCommentReqDto),
        );
    }

    @Get()
    @ApiOperation({ summary: '댓글 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '댓글 목록 조회 성공',
        type: ApiResponseDto<GetCommentListResDto>,
    })
    async getComments(
        @Query() paginationDto: PaginationDto,
    ): Promise<ApiResponseDto<GetCommentListResDto>> {
        return ApiResponseDto.ok(
            await this.commentService.getComments(paginationDto),
        );
    }
}
