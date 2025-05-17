import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, JoinColumn } from 'typeorm';
import { CV } from './cv.entity';

@Entity('socials')
export class Social {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    icon: string;

    @Column()
    link: string;

    @ManyToOne(() => CV, (cv) => cv.socials, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cv_id' })
    cv: Relation<CV>;
}