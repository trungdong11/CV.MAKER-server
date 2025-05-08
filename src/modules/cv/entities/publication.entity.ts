import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
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

    @Column()
    publicationDate: Date;

    @Column()
    description: string;

    @ManyToOne(() => CV, (cv) => cv.publication, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}