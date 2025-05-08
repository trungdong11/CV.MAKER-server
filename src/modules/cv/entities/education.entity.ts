import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('education')
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    degree: string;

    @Column()
    school: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    schoolLink: string;

    @Column()
    city: string;

    @Column('decimal')
    GPA: number;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.education, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}