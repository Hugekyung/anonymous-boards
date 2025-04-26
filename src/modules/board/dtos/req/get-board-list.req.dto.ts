import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetBoardListDto extends PaginationDto {
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
        description: '작성자명',
    })
    authorName?: string;
}
