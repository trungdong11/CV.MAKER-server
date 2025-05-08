import { Expose } from 'class-transformer';

export class SummaryResponseDto {
  @Expose()
  readonly content: string[];
}

export class EnhanceResponseDto {
  @Expose()
  readonly result: string;
}