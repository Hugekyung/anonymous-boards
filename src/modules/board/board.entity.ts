import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { IBoard } from './interfaces/board.interface';

@Entity({ name: 'Boards' })
export class Board implements IBoard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, comment: '제목' })
    title: string;

    @Column({ type: 'varchar', length: 1000, comment: '내용' })
    content: string;

    @Column({ type: 'varchar', length: 15, comment: '작성자 이름' })
    authorName: string;

    @Column({ type: 'varchar', length: 100, comment: '비밀번호' })
    password: string;

    @OneToMany(() => Comment, (comment) => comment.board)
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | null;
}
