import { IsString, IsNotEmpty } from 'class-validator';

export class SummaryRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly jobTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly seniority: string;
}

export class EnhanceRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}