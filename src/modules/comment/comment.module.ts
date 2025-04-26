import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Board])],
    controllers: [CommentController],
    providers: [
        CommentService,
        CommentFactory,
        CommentRepository,
        BoardRepository,
    ],
})
export class CommentModule {}
