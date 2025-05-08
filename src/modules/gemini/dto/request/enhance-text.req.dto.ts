import { IsString, IsNotEmpty } from 'class-validator';

export class EnhanceTextRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;
} 