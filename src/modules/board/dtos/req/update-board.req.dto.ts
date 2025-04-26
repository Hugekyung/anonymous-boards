import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: 'string',
        required: false,
        description: '제목',
    })
    title?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: 'string',
        required: false,
        description: '게시글 내용',
    })
    content?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: 'string',
        required: false,
        description: '작성자명',
    })
    authorName?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: 'string',
        required: false,
        description: '비밀번호',
    })
    password: string;
}
