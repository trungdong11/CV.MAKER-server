import { Expose } from 'class-transformer';

export class EnhanceTextResponseDto {
  @Expose()
  readonly enhancedText: string;
} 