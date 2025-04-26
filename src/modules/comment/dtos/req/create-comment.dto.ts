import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IBoard } from 'src/modules/board/interfaces/board.interface';
import { IComment } from '../../interfaces/comment.interface';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '댓글 내용' })
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '작성자명' })
    authorName: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        type: 'number',
        required: false,
        description: '게시글 일련번호',
    })
    boardId?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        type: 'number',
        required: false,
        description: '댓글 일련번호',
    })
    commentId?: number;

    @IsOptional()
    @ApiPropertyOptional({
        type: 'number',
        required: false,
        description: '게시글 객체',
    })
    board?: IBoard | null;

    @IsOptional()
    @ApiPropertyOptional({
        type: 'number',
        required: false,
        description: '댓글 객체',
    })
    comment?: IComment | null;
}
