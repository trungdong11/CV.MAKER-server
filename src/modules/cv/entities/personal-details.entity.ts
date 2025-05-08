import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from 'typeorm';
import { CV } from './cv.entity';

@Entity('personal_details')
export class PersonalDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    jobTitle: string;

    @OneToOne(() => CV, (cv) => cv.personalDetails, { nullable: true })
    @JoinColumn({ name: 'cvId' })
    cv?: Relation<CV>;
}