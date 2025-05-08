import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('work')
export class Work {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyName: string;

    @Column()
    iscurrentWorking: boolean;

    @Column()
    position: string;

    @Column()
    location: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.works, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}