import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { CommentModule } from './modules/comment/comment.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
    imports: [BoardModule, CommentModule, NotificationModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
