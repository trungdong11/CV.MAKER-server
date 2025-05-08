import { IsString, IsBoolean, IsDateString, IsOptional, IsArray, IsEmail, IsNumber } from 'class-validator';

export class UpdatePersonalDetailsDto {
    @IsString()
    @IsOptional()
    fullname?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

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
    jobTitle?: string;
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
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsOptional()
    schoolLink?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsNumber()
    @IsOptional()
    GPA?: number;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateAwardDto {
    @IsString()
    @IsOptional()
    awardTitle?: string;

    @IsString()
    @IsOptional()
    awardTitleLink?: string;

    @IsString()
    @IsOptional()
    issuer?: string;

    @IsString()
    @IsOptional()
    issuedDate?: string;
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
    skillCategory?: string;

    @IsString()
    @IsOptional()
    listOfSkill?: string;
}

export class UpdateWorkDto {
    @IsString()
    @IsOptional()
    companyName?: string;

    @IsBoolean()
    @IsOptional()
    isCurrentWorking?: boolean;

    @IsString()
    @IsOptional()
    position?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    projectName?: string;

    @IsString()
    @IsOptional()
    projectLink?: string;

    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCertificationDto {
    @IsString()
    @IsOptional()
    certificationName?: string;

    @IsString()
    @IsOptional()
    issuingOrganization?: string;

    @IsDateString()
    @IsOptional()
    issuedDate?: string;

    @IsString()
    @IsOptional()
    certificationLink?: string;

    @IsString()
    @IsOptional()
    credentialId?: string;
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

    @IsString()
    @IsOptional()
    publicationDate?: string;

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
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCvReqDto {
    // @IsString()
    // @IsOptional()
    // lngCode?: string;

    // @IsBoolean()
    // @IsOptional()
    // isPremium?: boolean;

    @IsString()
    @IsOptional()
    summary?: string;

    @IsOptional()
    personalDetails?: UpdatePersonalDetailsDto;

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