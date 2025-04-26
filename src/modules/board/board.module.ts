import { Module } from '@nestjs/common';
import { BoardController } from './controllers/board.controller';
import { BoardService } from './services/board.service';

@Module({
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
