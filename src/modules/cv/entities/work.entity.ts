import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('work')
export class Work {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_name' })
    company_name: string;

    @Column({ name: 'is_current_working' })
    is_current_working: boolean;

    @Column()
    position: string;

    @Column()
    location: string;

    @Column({ name: 'start_date' })
    start_date: Date;

    @Column({ name: 'end_date' })
    end_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.works)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}