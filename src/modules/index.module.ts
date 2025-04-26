import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [BoardModule, CommentModule, NotificationModule],
    controllers: [],
    providers: [],
})
export class IndexModule {}
