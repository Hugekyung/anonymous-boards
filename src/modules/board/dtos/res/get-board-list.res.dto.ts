import { ApiProperty } from '@nestjs/swagger';
import { IBoard } from '../../interfaces/board.interface';

export class GetBoardListDto {
    boards: IBoard[];
    counts: number;
}

export class GetBoardListResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: GetBoardListDto })
    data: GetBoardListDto;
}
