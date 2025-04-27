import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
    @ApiProperty({ description: '요청 성공 여부', default: 1 })
    readonly resultCode: number;

    @ApiPropertyOptional({ description: '에러 메시지' })
    readonly errorMessage?: string;

    @ApiPropertyOptional({ description: '응답 데이터', type: Object })
    readonly data?: T;

    private constructor(resultCode: number, data?: T, errorMessage?: string) {
        this.resultCode = resultCode;
        this.data = data;
        this.errorMessage = errorMessage;
    }

    static ok<U>(data: U): ApiResponseDto<U> {
        return new ApiResponseDto<U>(1, data);
    }
}

export class CommonResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;
}
