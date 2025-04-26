import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardFactory } from './board.factory';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
    imports: [TypeOrmModule.forFeature([Board]), NotificationModule],
    controllers: [BoardController],
    providers: [BoardService, BoardFactory, BoardRepository],
})
export class BoardModule {}
