import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    position: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.organization, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}