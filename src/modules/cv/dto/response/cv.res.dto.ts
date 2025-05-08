import { Expose, Type } from 'class-transformer';

export class PersonalDetailsResDto {
    @Expose({ name: 'fullname' })
    fullname: string;

    @Expose({ name: 'phoneNumber' })
    phoneNumber: string;

    @Expose()
    address: string;

    @Expose()
    birthday: string;

    @Expose({ name: 'email' })
    email: string;

    @Expose({ name: 'avatar' })
    avatar: string;

    @Expose({ name: 'jobTitle' })
    jobTitle: string;
}

export class SocialResDto {
    @Expose()
    id: string;

    @Expose()
    icon: string;

    @Expose()
    link: string;
}

export class EducationResDto {
    @Expose()
    id: string;

    @Expose()
    degree: string;

    @Expose()
    school: string;

    @Expose({ name: 'startDate' })
    startDate: string;

    @Expose({ name: 'endDate' })
    endDate: string;

    @Expose({ name: 'schoolLink' })
    schoolLink: string;

    @Expose()
    city: string;

    @Expose({ name: 'GPA' })
    GPA: number;

    @Expose()
    description: string;
}

export class AwardResDto {
    @Expose()
    id: string;

    @Expose({ name: 'awardTitle' })
    awardTitle: string;

    @Expose({ name: 'awardTitleLink' })
    awardTitleLink: string;

    @Expose({ name: 'issuedBy' })
    issuedBy: string;

    @Expose({ name: 'issuedDate' })
    issuedDate: string;

    @Expose()
    description: string;
}

export class LanguageResDto {
    @Expose()
    id: string;

    @Expose()
    language: string;

    @Expose()
    proficiency: string;
}

export class SkillResDto {
    @Expose()
    id: string;

    @Expose({ name: 'skillCategory' })
    skillCategory: string;

    @Expose({ name: 'listOfSkill' })
    listOfSkill: string;
}

export class WorkResDto {
    @Expose()
    id: string;

    @Expose({ name: 'companyName' })
    companyName: string;

    @Expose({ name: 'isCurrentWorking' })
    isCurrentWorking: boolean;

    @Expose()
    position: string;

    @Expose()
    location: string;

    @Expose({ name: 'startDate' })
    startDate: string;

    @Expose({ name: 'endDate' })
    endDate: string;

    @Expose()
    description: string;
}

export class ProjectResDto {
    @Expose()
    id: string;

    @Expose({ name: 'projectName' })
    projectName: string;

    @Expose({ name: 'projectLink' })
    projectLink: string;

    @Expose({ name: 'startDate' })
    startDate: string;

    @Expose({ name: 'endDate' })
    endDate: string;

    @Expose()
    description: string;
}

export class CertificationResDto {
    @Expose()
    id: string;

    @Expose({ name: 'certificationName' })
    certificationName: string;

    @Expose({ name: 'issuingOrganization' })
    issuingOrganization: string;

    @Expose({ name: 'issuedDate' })
    issuedDate: string;

    @Expose({ name: 'certificationLink' })
    certificationLink: string;

    @Expose({ name: 'credentialId' })
    credentialId: string;
}

export class PublicationResDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    publisher: string;

    @Expose()
    url: string;

    @Expose({ name: 'publicationDate' })
    publicationDate: string;

    @Expose()
    description: string;
}

export class OrganizationResDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    position: string;

    @Expose()
    address: string;

    @Expose({ name: 'startDate' })
    startDate: string;  

    @Expose({ name: 'endDate' })
    endDate: string;

    @Expose()
    description: string;
}

export class CvResDto {
    @Expose()
    id: string;

    // @Expose()
    // lngCode: string;

    // @Expose()
    // isPremium: boolean;

    @Expose({ name: 'createdAt' })
    createdAt: Date;

    @Expose({ name: 'updatedAt' })
    updatedAt: Date;

    // @Expose()
    // status: string;

    @Expose()
    summary: string;

    @Expose()
    @Type(() => PersonalDetailsResDto)
    personalDetails: PersonalDetailsResDto;

    @Expose()
    @Type(() => SocialResDto)
    socials: SocialResDto[];

    @Expose()
    @Type(() => EducationResDto)
    education: EducationResDto[];

    @Expose()
    @Type(() => AwardResDto)
    award: AwardResDto[];

    @Expose()
    @Type(() => LanguageResDto)
    languages: LanguageResDto[];

    @Expose()
    @Type(() => SkillResDto)
    skills: SkillResDto[];

    @Expose()
    @Type(() => WorkResDto)
    works: WorkResDto[];

    @Expose()
    @Type(() => ProjectResDto)
    projects: ProjectResDto[];

    @Expose()
    @Type(() => CertificationResDto)
    certification: CertificationResDto[];

    @Expose()
    @Type(() => PublicationResDto)
    publication: PublicationResDto[];

    @Expose()
    @Type(() => OrganizationResDto)
    organization: OrganizationResDto[];
}