import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('publication')
export class Publication {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    publisher: string;

    @Column()
    url: string;

    @Column({ name: 'publication_date' })
    publication_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.publication)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}