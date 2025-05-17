import { IsString, IsBoolean, IsDateString, IsOptional, IsArray, IsEmail, IsNumber } from 'class-validator';

export class UpdatePersonalDetailsDto {
    @IsString()
    @IsOptional()
    full_name?: string;

    @IsString()
    @IsOptional()
    phone_number?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsDateString()
    @IsOptional()
    birthday?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    job_title?: string;
}

export class UpdateSocialDto {
    @IsString()
    @IsOptional()
    icon?: string;

    @IsString()
    @IsOptional()
    link?: string;
}

export class UpdateEducationDto {
    @IsString()
    @IsOptional()
    degree?: string;

    @IsString()
    @IsOptional()
    school?: string;

    @IsDateString()
    @IsOptional()
    start_date?: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsString()
    @IsOptional()
    school_link?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsNumber()
    @IsOptional()
    gpa?: number;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateAwardDto {
    @IsString()
    @IsOptional()
    award_title?: string;

    @IsString()
    @IsOptional()
    award_title_link?: string;

    @IsString()
    @IsOptional()
    issued_by?: string;

    @IsDateString()
    @IsOptional()
    issued_date?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateLanguageDto {
    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    proficiency?: string;
}

export class UpdateSkillDto {
    @IsString()
    @IsOptional()
    skill_category?: string;

    @IsString()
    @IsOptional()
    list_of_skill?: string;
}

export class UpdateWorkDto {
    @IsString()
    @IsOptional()
    company_name?: string;

    @IsBoolean()
    @IsOptional()
    is_current_working?: boolean;

    @IsString()
    @IsOptional()
    position?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsDateString()
    @IsOptional()
    start_date?: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    project_name?: string;

    @IsString()
    @IsOptional()
    project_link?: string;

    @IsDateString()
    @IsOptional()
    start_date?: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsBoolean()
    @IsOptional()
    is_ongoing?: boolean;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCertificationDto {
    @IsString()
    @IsOptional()
    certification_name?: string;

    @IsString()
    @IsOptional()
    issuing_organization?: string;

    @IsDateString()
    @IsOptional()
    issued_date?: string;

    @IsString()
    @IsOptional()
    certification_link?: string;

    @IsString()
    @IsOptional()
    credential_id?: string;
}

export class UpdatePublicationDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    publisher?: string;

    @IsString()
    @IsOptional()
    url?: string;

    @IsDateString()
    @IsOptional()
    publication_date?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateOrganizationDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsDateString()
    @IsOptional()
    start_date?: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCvReqDto {
    @IsString()
    @IsOptional()
    summary?: string;

    @IsOptional()
    personal_details?: UpdatePersonalDetailsDto;

    @IsArray()
    @IsOptional()
    socials?: UpdateSocialDto[];

    @IsArray()
    @IsOptional()
    education?: UpdateEducationDto[];

    @IsArray()
    @IsOptional()
    award?: UpdateAwardDto[];

    @IsArray()
    @IsOptional()
    languages?: UpdateLanguageDto[];

    @IsArray()
    @IsOptional()
    skills?: UpdateSkillDto[];

    @IsArray()
    @IsOptional()
    works?: UpdateWorkDto[];

    @IsArray()
    @IsOptional()
    projects?: UpdateProjectDto[];

    @IsArray()
    @IsOptional()
    certification?: UpdateCertificationDto[];

    @IsArray()
    @IsOptional()
    publication?: UpdatePublicationDto[];

    @IsArray()
    @IsOptional()
    organization?: UpdateOrganizationDto[];
}