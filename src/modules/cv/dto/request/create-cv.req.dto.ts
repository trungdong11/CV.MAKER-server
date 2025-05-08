import { IsString, IsBoolean, IsDateString, IsOptional, IsArray, IsEmail, IsNumber } from 'class-validator';

export class CreatePersonalDetailsDto {
    @IsString()
    fullname: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsDateString()
    birthday: string;

    @IsEmail()
    email: string;

    @IsString()
    avatar: string;

    @IsString()
    jobTitle: string;
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
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    schoolLink: string;

    @IsString()
    city: string;

    @IsNumber()
    GPA: number;

    @IsString()
    description: string;
}

export class CreateAwardDto {
    @IsString()
    awardTitle: string;

    @IsString()
    awardTitleLink: string;

    @IsString()
    issuedBy: string;

    @IsString()
    issuedDate: string;

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
    skillCategory: string;

    @IsString()
    listOfSkill: string;
}

export class CreateWorkDto {
    @IsString()
    companyName: string;

    @IsBoolean()
    isCurrentWorking: boolean;

    @IsString()
    position: string;

    @IsString()
    location: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    description: string;
}

export class CreateProjectDto {
    @IsString()
    projectName: string;

    @IsString()
    projectLink: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate: string;

    @IsString()
    description: string;
}

export class CreateCertificationDto {
    @IsString()
    certificationName: string;

    @IsString()
    issuingOrganization: string;

    @IsDateString()
    issuedDate: string;

    @IsString()
    certificationLink: string;

    @IsString()
    credentialId: string;
}

export class CreatePublicationDto {
    @IsString()
    title: string;

    @IsString()
    publisher: string;

    @IsString()
    url: string;

    @IsString()
    publicationDate: string;

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
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate: string;

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
    personalDetails?: CreatePersonalDetailsDto;

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