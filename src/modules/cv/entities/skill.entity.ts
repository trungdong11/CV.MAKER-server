import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'skill_category' })
    skill_category: string;

    @Column({ name: 'list_of_skill' })
    list_of_skill: string;

    @ManyToOne(() => CV, (cv) => cv.skills)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}