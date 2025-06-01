import { IsNumber, IsArray, IsOptional, IsString, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class GrammarErrorDetailedDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suggestion?: string;
}

class SuggestionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  issue?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suggestion?: string;
}

class SectionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  section?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  content_score?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  final_score?: number;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  grammar_errors?: { minor: number; severe: number };

  @ApiProperty({ type: [GrammarErrorDetailedDto] })
  @IsArray()
  @IsOptional()
  grammar_errors_detailed?: GrammarErrorDetailedDto[];

  @ApiProperty({ type: [SuggestionDto] })
  @IsArray()
  @IsOptional()
  suggestions?: SuggestionDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  quality?: string;
}

export class UpdateEvaluateDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total_content_score?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total_final_score?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  content_score_100?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  final_score_100?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total_grammar_errors?: number;

  @ApiProperty({ type: [SectionDto] })
  @IsArray()
  @IsOptional()
  sections?: SectionDto[];
}