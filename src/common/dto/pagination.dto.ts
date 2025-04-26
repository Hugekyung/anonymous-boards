import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty({
        type: 'number',
        required: true,
        description: '페이지',
    })
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty({
        type: 'number',
        required: true,
        description: '페이지 당 데이터 수',
    })
    perPage: number;
}
