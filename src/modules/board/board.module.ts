import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardFactory } from './board.factory';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [BoardController],
    providers: [BoardService, BoardFactory, BoardRepository],
})
export class BoardModule {}
