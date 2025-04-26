import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '제목' })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '게시글 내용' })
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '작성자명' })
    authorName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '비밀번호' })
    password: string;
}
