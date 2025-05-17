import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    position: string;


    @Column({ name: 'start_date' })
    start_date: Date;

    @Column({ name: 'end_date' })
    end_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.organization)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}