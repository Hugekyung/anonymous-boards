import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class Board {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 100, comment: '제목' })
    title: string;

    @Column({ type: 'varchar', length: 1000, comment: '내용' })
    content: string;

    @Column({ type: 'varchar', length: 15, comment: '작성자 이름' })
    authorName: string;

    @Column({ type: 'varchar', length: 20, comment: '비밀번호' })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | null;
}
