import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('certification')
export class Certification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    certificationName: string;

    @Column()
    issuingOrganization: string;

    @Column()
    issuedDate: Date;

    @Column()
    certificationLink: string;

    @Column()
    credentialId: string;

    @ManyToOne(() => CV, (cv) => cv.certification, { onDelete: 'CASCADE' })
    cv: Relation<CV>;
}