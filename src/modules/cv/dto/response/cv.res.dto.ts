import { Expose, Type } from 'class-transformer';

export class PersonalDetailsResDto {
    @Expose()
    id: string;

    @Expose()
    full_name: string;

    @Expose()
    phone_number: string;

    @Expose()
    address: string;

    @Expose()
    birthday: string;

    @Expose()
    email: string;

    @Expose()
    avatar: string;

    @Expose()
    job_title: string;
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

    @Expose({ name: 'start_date' })
    start_date: string;

    @Expose({ name: 'end_date' })
    end_date: string;

    @Expose({ name: 'school_link' })
    school_link: string;

    @Expose()
    city: string;

    @Expose({ name: 'gpa' })
    gpa: number;

    @Expose()
    description: string;
}

export class AwardResDto {
    @Expose()
    id: string;

    @Expose({ name: 'award_title' })
    award_title: string;

    @Expose({ name: 'award_title_link' })
    award_title_link: string;

    @Expose({ name: 'issued_by' })
    issued_by: string;

    @Expose({ name: 'issued_date' })
    issued_date: string;

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

    @Expose({ name: 'skill_category' })
    skill_category: string;

    @Expose({ name: 'list_of_skill' })
    list_of_skill: string;
}

export class WorkResDto {
    @Expose()
    id: string;

    @Expose({ name: 'company_name' })
    company_name: string;

    @Expose({ name: 'is_current_working' })
    is_current_working: boolean;

    @Expose()
    position: string;

    @Expose()
    location: string;

    @Expose({ name: 'start_date' })
    start_date: string;

    @Expose({ name: 'end_date' })
    end_date: string;

    @Expose()
    description: string;
}

export class ProjectResDto {
    @Expose()
    id: string;

    @Expose({ name: 'project_name' })
    project_name: string;

    @Expose({ name: 'project_link' })
    project_link: string;

    @Expose({ name: 'start_date' })
    start_date: string;

    @Expose({ name: 'end_date' })
    end_date: string;

    @Expose({ name: 'is_ongoing' })
    is_ongoing: boolean;

    @Expose()
    description: string;
}

export class CertificationResDto {
    @Expose()
    id: string;

    @Expose({ name: 'certification_name' })
    certification_name: string;

    @Expose({ name: 'issuing_organization' })
    issuing_organization: string;

    @Expose({ name: 'issued_date' })
    issued_date: string;

    @Expose({ name: 'certification_link' })
    certification_link: string;

    @Expose({ name: 'credential_id' })
    credential_id: string;
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

    @Expose({ name: 'publication_date' })
    publication_date: string;

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

    @Expose({ name: 'start_date' })
    start_date: string;

    @Expose({ name: 'end_date' })
    end_date: string;

    @Expose()
    description: string;
}

export class CvResDto {
    @Expose()
    id: string;

    @Expose({ name: 'created_at' })
    created_at: Date;

    @Expose({ name: 'updated_at' })
    updated_at: Date;

    @Expose()
    summary: string;

    @Expose()
    @Type(() => PersonalDetailsResDto)
    personal_details: PersonalDetailsResDto;

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

export class CvResListDto {
    @Expose()
    id: string;

    @Expose({ name: 'created_at' })
    created_at: Date;

    @Expose({ name: 'updated_at' })
    updated_at: Date;

    @Expose()
    summary: string;

    @Expose()
    @Type(() => PersonalDetailsResDto)
    personal_details: PersonalDetailsResDto;
}