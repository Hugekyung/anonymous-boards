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

    @ManyToOne(() => Comment, (comment) => comment.children, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    parent: Comment | null;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children: Comment[];

    @ManyToOne(() => Board, (board) => board.comments)
    @JoinColumn()
    board: Board | null;
}
