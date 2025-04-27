import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { IComment } from './interfaces/comment.interface';

@Entity({ name: 'Comments' })
export class Comment implements IComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 1000, comment: '내용' })
    content: string;

    @Column({ type: 'varchar', length: 15, comment: '작성자 이름' })
    authorName: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({
        name: 'parentId',
        comment: '댓글 부모 ID',
        nullable: true,
        type: 'int',
    })
    parentId: number;

    @ManyToOne(() => Comment, (comment) => comment.children, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent: Comment | null;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children: Comment[];

    @Column({
        name: 'boardId',
        comment: '게시물 ID',
        nullable: true,
        type: 'int',
    })
    boardId: number;

    @ManyToOne(() => Board, (board) => board.comments, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
    board: Board | null;
}
