import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('certification')
export class Certification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'certification_name' })
    certification_name: string;

    @Column({ name: 'issuing_organization' })
    issuing_organization: string;

    @Column({ name: 'issued_date' })
    issued_date: Date;

    @Column({ name: 'certification_link' })
    certification_link: string;

    @Column({ name: 'credential_id' })
    credential_id: string;

    @ManyToOne(() => CV, (cv) => cv.certification)
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}