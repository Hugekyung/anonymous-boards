import { Injectable, Logger } from '@nestjs/common';
import { IKeywordNotification } from './interfaces/keyword-notification.interface';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
    ) {}

    async notifyIfMatched(text: string): Promise<void> {
        const matched: IKeywordNotification[] =
            await this.notificationRepository.findManyInText(text);
        if (matched.length > 0) {
            for (const { authorName, keyword } of matched) {
                this.send(authorName);
                Logger.log(
                    `[${keyword}] 키워드에 대한 알림이 [${authorName}] 에게 발송되었습니다.`,
                );
            }
        }

        return;
    }

    private send(recipient: string): string {
        return `${recipient}에게 키워드 알림 발송 완료`;
    }
}
