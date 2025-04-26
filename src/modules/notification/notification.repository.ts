import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IKeywordNotification } from './interfaces/keyword-notification.interface';
import { KeywordNotification } from './keyword-notification.entity';

export class NotificationRepository {
    constructor(
        @InjectRepository(KeywordNotification)
        private readonly notificationRepository: Repository<IKeywordNotification>,
    ) {}

    async findManyInText(text: string): Promise<IKeywordNotification[]> {
        return await this.notificationRepository
            .createQueryBuilder()
            .where(`:text LIKE CONCAT('%', keyword, '%')`, { text })
            .getMany();
    }
}
