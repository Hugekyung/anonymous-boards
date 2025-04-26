import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IKeywordNotification } from './interfaces/keyword-notification.interface';

@Entity({ name: 'Keyword_Notifications' })
export class KeywordNotification implements IKeywordNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15, comment: '작성자 이름' })
    authorName: string;

    @Column({ type: 'varchar', length: 15, comment: '키워드' })
    keyword: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
