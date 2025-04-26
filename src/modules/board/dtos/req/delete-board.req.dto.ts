import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBoardDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', required: true, description: '비밀번호' })
    password: string;
}
