import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('award')
export class Award {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'award_title' })
    award_title: string;

    @Column({ name: 'award_title_link' })
    award_title_link: string;

    @Column({ name: 'issued_by' })
    issued_by: string;

    @Column({ name: 'issued_date' })
    issued_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.award)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}