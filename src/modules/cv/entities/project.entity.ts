import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    projectName: string;

    @Column()
    projectLink: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.projects, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}