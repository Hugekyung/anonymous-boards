import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './controllers/board.controller';
import { Board } from './entities/board.entity';
import { BoardFactory } from './factories/board.factory';
import { BoardRepository } from './repositories/board.repository';
import { BoardService } from './services/board.service';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [BoardController],
    providers: [BoardService, BoardFactory, BoardRepository],
})
export class BoardModule {}
