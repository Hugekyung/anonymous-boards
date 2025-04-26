import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { IComment } from './interfaces/comment.interface';

@Injectable()
export class CommentFactory {
    constructor(private readonly commentRepository: CommentRepository) {}

    async create(): Promise<IComment> {
        return;
    }
}
