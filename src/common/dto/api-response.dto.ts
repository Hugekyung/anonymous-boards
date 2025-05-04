import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
    @ApiProperty({ description: '요청 성공 여부' })
    readonly success: boolean;

    @ApiPropertyOptional({ description: '에러 메시지' })
    readonly errorMessage?: string;

    @ApiPropertyOptional({ description: '응답 데이터' })
    readonly data?: T;

    private constructor(success: boolean, data?: T, errorMessage?: string) {
        this.success = success;
        this.data = data;
        this.errorMessage = errorMessage;
    }

    // 데이터 있는 OK
    static ok<U>(data: U, message?: string): ApiResponseDto<U>;
    // 데이터 없는 OK
    static ok(message?: string): ApiResponseDto<null>;
    static ok<U>(arg1?: U | string, arg2?: string): ApiResponseDto<U | null> {
        if (typeof arg1 === 'string' || arg1 === undefined) {
            return new ApiResponseDto<U | null>(true, null, arg1 as string);
        } else {
            return new ApiResponseDto<U>(true, arg1, arg2);
        }
    }

    // static ok<U>(data: U): ApiResponseDto<U> {
    //     return new ApiResponseDto<U>(true, data);
    // }
}

// export class CommonResDto {
//     @ApiProperty({ default: 1 })
//     resultCode: number;
// }
