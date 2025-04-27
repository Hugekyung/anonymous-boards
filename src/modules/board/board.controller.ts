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
import { ApiTags } from '@nestjs/swagger';
import { NotifyKeywords } from 'src/common/decorators/notify-keywords.decorator';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { KeywordType } from 'src/common/enum';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/req/create-board.req.dto';
import { DeleteBoardDto } from './dtos/req/delete-board.req.dto';
import { GetBoardListDto } from './dtos/req/get-board-list.req.dto';
import { UpdateBoardDto } from './dtos/req/update-board.req.dto';
import { GetBoardListResDto } from './dtos/res/get-board-list.res.dto';

@ApiTags('게시판')
@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @NotifyKeywords(KeywordType.BOARD)
    async createBoard(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<ApiResponseDto<void>> {
        return ApiResponseDto.ok(
            await this.boardService.createBoard(createBoardDto),
        );
    }

    @Get()
    async getBoards(
        @Query() getBoardListDto: GetBoardListDto,
    ): Promise<ApiResponseDto<GetBoardListResDto>> {
        return ApiResponseDto.ok(
            await this.boardService.getBoards(getBoardListDto),
        );
    }

    @Patch(':boardId')
    async updateBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ): Promise<ApiResponseDto<void | Error>> {
        return ApiResponseDto.ok(
            await this.boardService.updateBoard(boardId, updateBoardDto),
        );
    }

    @Delete(':boardId')
    async deleteBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() deleteBoardDto: DeleteBoardDto,
    ): Promise<ApiResponseDto<void | Error>> {
        return ApiResponseDto.ok(
            await this.boardService.deleteBoard(boardId, deleteBoardDto),
        );
    }
}
