import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('language')
export class Language {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    language: string;

    @Column()
    proficiency: string;

    @ManyToOne(() => CV, (cv) => cv.languages)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}