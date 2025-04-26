import { ApiProperty } from '@nestjs/swagger';
import { IComment } from '../../interfaces/comment.interface';

export class GetCommentListDto {
    comments: IComment[];
    counts: number;
}

export class GetCommentListResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: GetCommentListDto })
    data: GetCommentListDto;
}
