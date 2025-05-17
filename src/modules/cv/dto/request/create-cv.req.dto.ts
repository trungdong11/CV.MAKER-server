import { IsString, IsBoolean, IsDateString, IsOptional, IsArray, IsEmail, IsNumber } from 'class-validator';

export class CreatePersonalDetailsDto {
    @IsString()
    full_name: string;

    @IsString()
    phone_number: string;

    @IsString()
    address: string;

    @IsDateString()
    birthday: string;

    @IsEmail()
    email: string;

    @IsString()
    avatar: string;

    @IsString()
    job_title: string;
}

export class CreateSocialDto {
    @IsString()
    icon: string;

    @IsString()
    link: string;
}

export class CreateEducationDto {
    @IsString()
    degree: string;

    @IsString()
    school: string;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsString()
    school_link: string;

    @IsString()
    city: string;

    @IsNumber()
    GPA: number;

    @IsString()
    description: string;
}

export class CreateAwardDto {
    @IsString()
    award_title: string;

    @IsString()
    award_title_link: string;

    @IsString()
    issued_by: string;

    @IsDateString()
    issued_date: string;

    @IsString()
    description: string;
}

export class CreateLanguageDto {
    @IsString()
    language: string;

    @IsString()
    proficiency: string;
}

export class CreateSkillDto {
    @IsString()
    skill_category: string;

    @IsString()
    list_of_skill: string;
}

export class CreateWorkDto {
    @IsString()
    company_name: string;

    @IsBoolean()
    is_current_working: boolean;

    @IsString()
    position: string;

    @IsString()
    location: string;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsString()
    description: string;
}

export class CreateProjectDto {
    @IsString()
    project_name: string;

    @IsString()
    project_link: string;

    @IsDateString()
    start_date: string;

    @IsDateString()
    @IsOptional()
    end_date: string;

    @IsBoolean()
    is_ongoing: boolean;

    @IsString()
    description: string;
}

export class CreateCertificationDto {
    @IsString()
    certification_name: string;

    @IsString()
    issuing_organization: string;

    @IsDateString()
    issued_date: string;

    @IsString()
    certification_link: string;

    @IsString()
    credential_id: string;
}

export class CreatePublicationDto {
    @IsString()
    title: string;

    @IsString()
    publisher: string;

    @IsString()
    url: string;

    @IsDateString()
    publication_date: string;

    @IsString()
    description: string;
}

export class CreateOrganizationDto {
    @IsString()
    name: string;

    @IsString()
    position: string;

    @IsString()
    address: string;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsString()
    description: string;
}

export class CreateCvReqDto {
    // @IsString()
    // lngCode: string;

    // @IsBoolean()
    // isPremium: boolean;

    @IsString()
    @IsOptional()
    summary: string;

    @IsOptional()
    personal_details?: CreatePersonalDetailsDto;

    @IsArray()
    @IsOptional()
    socials?: CreateSocialDto[];

    @IsArray()
    @IsOptional()
    education?: CreateEducationDto[];

    @IsArray()
    @IsOptional()
    award?: CreateAwardDto[];

    @IsArray()
    @IsOptional()
    languages?: CreateLanguageDto[];

    @IsArray()
    @IsOptional()
    skills?: CreateSkillDto[];

    @IsArray()
    @IsOptional()
    works?: CreateWorkDto[];

    @IsArray()
    @IsOptional()
    projects?: CreateProjectDto[];

    @IsArray()
    @IsOptional()
    certification?: CreateCertificationDto[];

    @IsArray()
    @IsOptional()
    publication?: CreatePublicationDto[];

    @IsArray()
    @IsOptional()
    organization?: CreateOrganizationDto[];
}