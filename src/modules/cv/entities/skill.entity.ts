import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    skillCategory: string;

    @Column()
    ListOfSkill: string;

    @ManyToOne(() => CV, (cv) => cv.skills, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}