import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FixTextResponseDto {
  @ApiProperty({
    description: 'Text with corrected spelling and grammar',
    example: 'I am a software engineer with 5 years of experience in web development.'
  })
  @Expose()
  readonly fixedText: string;
} 