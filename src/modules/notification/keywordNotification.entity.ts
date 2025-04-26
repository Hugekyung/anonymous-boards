import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Keyword_Notifications' })
export class KeywordNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15, comment: '작성자 이름' })
    authorName: string;

    @Column({ type: 'varchar', length: 15, comment: '키워드' })
    keyword: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
