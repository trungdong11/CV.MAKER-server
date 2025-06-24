import { ApiProperty } from '@nestjs/swagger';

export class GrammarErrorResDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  suggestion?: string;
}

export class SuggestionResDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  issue?: string;

  @ApiProperty()
  suggestion?: string;
}

export class EvaluateSectionResDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  section?: string;

  @ApiProperty()
  content_score?: number;

  @ApiProperty()
  final_score?: number;

  @ApiProperty()
  grammar_errors?: { minor: number; severe: number };

  @ApiProperty({ type: [GrammarErrorResDto] })
  grammar_errors_detailed?: GrammarErrorResDto[];

  @ApiProperty({ type: [SuggestionResDto] })
  suggestions?: SuggestionResDto[];

  @ApiProperty()
  quality?: string;
}

export class EvaluateResDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name_cv?: string;

  @ApiProperty()
  total_content_score?: number;

  @ApiProperty()
  total_final_score?: number;

  @ApiProperty()
  content_score_100?: number;

  @ApiProperty()
  final_score_100?: number;

  @ApiProperty()
  total_grammar_errors?: number;

  @ApiProperty({ type: [EvaluateSectionResDto] })
  sections?: EvaluateSectionResDto[];

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}