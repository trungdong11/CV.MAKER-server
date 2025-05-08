import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GeminiService } from '../gemini.service';
import { SummaryRequestDto } from '../dto/request/summary.req.dto';
import { SummaryResponseDto } from '../dto/response/summary.res.dto';
import { PermissionGuard } from '@common/guards/permission.guard';
import { ApiAuth } from '@common/decorators/http.decorators';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Uuid } from '@common/types/common.type';
import { EnhanceTextRequestDto } from '../dto/request/enhance-text.req.dto';
import { EnhanceTextResponseDto } from '../dto/response/enhance-text.res.dto';
import { FixTextRequestDto } from '../dto/request/fix-text.req.dto';
import { FixTextResponseDto } from '../dto/response/fix-text.res.dto';

@ApiTags('Gemini')
@Controller({
  path: 'gemini',
  version: '1',
})
@UseGuards(PermissionGuard)
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('summary')
  @ApiAuth({
    summary: 'Generate CV summary using Gemini AI',
    type: SummaryResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully generated summary',
    type: SummaryResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async generateSummary(
    @Body() dto: SummaryRequestDto,
    @CurrentUser('id') userId: Uuid
  ): Promise<SummaryResponseDto> {
    const content = await this.geminiService.generateSummary(dto.jobTitle, dto.seniority);
    return { content };
  }

  @Post('enhance-text')
  @ApiAuth({
    summary: 'Enhance text to make it more professional and detailed',
    type: EnhanceTextResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully enhanced text',
    type: EnhanceTextResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async enhanceText(
    @Body() dto: EnhanceTextRequestDto,
    @CurrentUser('id') userId: Uuid
  ): Promise<EnhanceTextResponseDto> {
    const enhancedText = await this.geminiService.enhanceText(dto.text);
    return { enhancedText };
  }

  @Post('fix-text')
  @ApiAuth({
    summary: 'Fix spelling and grammar in text',
    type: FixTextResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fixed text',
    type: FixTextResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async fixText(
    @Body() dto: FixTextRequestDto,
    @CurrentUser('id') userId: Uuid
  ): Promise<FixTextResponseDto> {
    const fixedText = await this.geminiService.fixText(dto.text);
    return { fixedText };
  }
}