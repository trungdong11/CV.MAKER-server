import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'project_name' })
    project_name: string;

    @Column({ name: 'project_link' })
    project_link: string;

    @Column({ name: 'start_date' })
    start_date: Date;

    @Column({ name: 'end_date' })
    end_date: Date;

    @Column({ name: 'is_ongoing' })
    is_ongoing: boolean;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.projects)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}