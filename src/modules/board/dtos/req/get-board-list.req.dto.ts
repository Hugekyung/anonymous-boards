import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetBoardListDto extends PaginationDto {
    title?: string;
    authorName?: string;
}
