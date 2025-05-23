import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordNotification } from './keyword-notification.entity';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([KeywordNotification])],
    providers: [NotificationService, NotificationRepository],
    exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
