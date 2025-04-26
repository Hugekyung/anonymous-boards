import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { KeywordType } from '../enum';
import { NotifyKeywordsInterceptor } from '../interceptors/notify-keyword.interceptor';

export function NotifyKeywords(type: KeywordType) {
    return applyDecorators(UseInterceptors(NotifyKeywordsInterceptor(type)));
}
