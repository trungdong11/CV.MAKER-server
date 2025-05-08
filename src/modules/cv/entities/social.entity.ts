import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('socials')
export class Social {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    icon: string;

    @Column()
    link: string;

    @ManyToOne(() => CV, (cv) => cv.socials, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}