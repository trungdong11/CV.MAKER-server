import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FixTextRequestDto {
  @ApiProperty({
    description: 'Text to be fixed for spelling and grammar',
    example: 'I am a software enginer with 5 year of experiance in web developement.'
  })
  @IsString()
  @IsNotEmpty()
  readonly text: string;
} 