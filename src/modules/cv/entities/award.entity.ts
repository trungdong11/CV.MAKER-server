import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('award')
export class Award {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    awardTitle: string;

    @Column()
    awardTitleLink: string;

    @Column()
    issuedDate: Date;

    @Column()
    description: string;

    @Column()
    issuedBy: string;

    @ManyToOne(() => CV, (cv) => cv.award, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}