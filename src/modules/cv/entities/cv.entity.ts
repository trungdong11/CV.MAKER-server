import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonalDetails } from './personal-details.entity';
import { Social } from './social.entity';
import { Education } from './education.entity';
import { Award } from './award.entity';
import { Language } from './language.entity';
import { Skill } from './skill.entity';
import { Work } from './work.entity';
import { Project } from './project.entity';
import { Certification } from './certification.entity';
import { Publication } from './publication.entity';
import { Organization } from './organization.entity';
import { Uuid } from '@common/types/common.type';

@Entity('cv')
export class CV {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    summary: string;

    @OneToOne(() => PersonalDetails, (personalDetails) => personalDetails.cv, { cascade: true, nullable: true })
    personalDetails?: PersonalDetails;

    @OneToMany(() => Social, (social) => social.cv, { cascade: true })
    socials?: Social[];

    @OneToMany(() => Education, (education) => education.cv, { cascade: true })
    education?: Education[];

    @OneToMany(() => Award, (award) => award.cv, { cascade: true })
    award?: Award[];

    @OneToMany(() => Language, (language) => language.cv, { cascade: true })
    languages?: Language[];

    @OneToMany(() => Skill, (skill) => skill.cv, { cascade: true })
    skills?: Skill[];

    @OneToMany(() => Work, (work) => work.cv, { cascade: true })
    works?: Work[];

    @OneToMany(() => Project, (project) => project.cv, { cascade: true })
    projects?: Project[];

    @OneToMany(() => Certification, (certification) => certification.cv, { cascade: true })
    certification?: Certification[];

    @OneToMany(() => Publication, (publication) => publication.cv, { cascade: true })
    publication?: Publication[];

    @OneToMany(() => Organization, (organization) => organization.cv, { cascade: true })
    organization?: Organization[];
}