import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/modules/notification/notification.service';
import { KeywordType } from '../enum';

export function NotifyKeywordsInterceptor(
    type: KeywordType,
): Type<NestInterceptor> {
    @Injectable()
    class MixinInterceptor implements NestInterceptor {
        constructor(
            private readonly notificationService: NotificationService,
        ) {}

        intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Observable<any> {
            const request = context.switchToHttp().getRequest();
            return next.handle().pipe(
                tap(async (result: any) => {
                    let text: string = request.body.content;
                    if (type === KeywordType.BOARD) {
                        text += request.body.title;
                    }
                    await this.notificationService.notifyIfMatched(text);
                }),
            );
        }
    }
    return MixinInterceptor;
}
