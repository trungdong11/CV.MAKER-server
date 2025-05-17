import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('education')
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    degree: string;

    @Column()
    school: string;

    @Column({ name: 'start_date' })
    start_date: Date;

    @Column({ name: 'end_date' })
    end_date: Date;

    @Column({ name: 'school_link' })
    school_link: string;

    @Column()
    city: string;

    @Column({ name: 'gpa' })
    gpa: number;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.education)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}