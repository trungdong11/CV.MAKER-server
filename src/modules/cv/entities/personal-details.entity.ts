import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('personal_details')
export class PersonalDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'full_name' })
    full_name: string;

    @Column({ name: 'phone_number' })
    phone_number: string;

    @Column()
    address: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column({ name: 'job_title' })
    job_title: string;

    @OneToOne(() => CV, (cv) => cv.personal_details, { nullable: true })
    @JoinColumn({ name: 'cv_id' })
    cv?: Relation<CV>;
}