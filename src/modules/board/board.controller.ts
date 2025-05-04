import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyKeywords } from 'src/common/decorators/notify-keywords.decorator';
import { ApiResponseDto, CommonResDto } from 'src/common/dto/api-response.dto';
import { KeywordType } from 'src/common/enum';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { DeleteBoardDto } from './dtos/req/delete-board.req.dto';
import { GetBoardListDto } from './dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from './dtos/req/update-board.req.dto';
import { GetBoardListResDto } from './dtos/res/get-board-list.res.dto';
import { IBoardService } from './interfaces/board.service.interface';

@ApiTags('게시판')
@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: IBoardService) {}

    @Post()
    @NotifyKeywords(KeywordType.BOARD)
    @ApiOperation({ summary: '게시물 생성' })
    @ApiResponse({
        status: 200,
        description: '게시물 생성 성공',
        type: CommonResDto,
    })
    async createBoard(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.boardService.createBoard(createBoardDto),
        );
    }

    @Get()
    @ApiOperation({ summary: '게시물 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '게시물 목록 조회 성공',
        type: ApiResponseDto<GetBoardListResDto>,
    })
    async getBoards(
        @Query() getBoardListDto: GetBoardListDto,
    ): Promise<ApiResponseDto<GetBoardListResDto>> {
        return ApiResponseDto.ok(
            await this.boardService.getBoards(getBoardListDto),
        );
    }

    @Patch(':boardId')
    @ApiOperation({ summary: '게시물 수정' })
    @ApiResponse({
        status: 200,
        description: '게시물 수정 성공',
        type: CommonResDto,
    })
    async updateBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.boardService.updateBoard(boardId, updateBoardDto),
        );
    }

    @Delete(':boardId')
    @ApiOperation({ summary: '게시물 삭제(softDelete)' })
    @ApiResponse({
        status: 200,
        description: '게시물 삭제 성공',
        type: CommonResDto,
    })
    async deleteBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() deleteBoardDto: DeleteBoardDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.boardService.deleteBoard(boardId, deleteBoardDto),
        );
    }
}
