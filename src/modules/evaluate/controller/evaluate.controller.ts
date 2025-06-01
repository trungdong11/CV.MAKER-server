import { ActionList, ResourceList } from '@common/constants/app.constant';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiAuth } from '@common/decorators/http.decorators';
import { ValidateUuid } from '@common/decorators/validators/uuid-validator';
import { Uuid } from '@common/types/common.type';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEvaluateDto } from '../dto/request/create-evaluate.dto';
import { UpdateEvaluateDto } from '../dto/request/update-evaluate.dto';
import { EvaluateResDto } from '../dto/response/evaluate.res.dto';
import { EvaluateService } from '../evaluate.service';
import { EvaluateValidationPipe } from '../pipes/evaluate-validation.pipe';

@ApiTags('Evaluate APIs')
@Controller({
  path: 'evaluate',
  version: '1',
})
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @ApiAuth({
    summary: 'Create a new evaluation',
    type: EvaluateResDto,
  })
  @ApiResponse({ status: 201, type: EvaluateResDto, description: 'Evaluation created successfully' })
  @Post()
  @UsePipes(EvaluateValidationPipe)
  async create(@Body() createEvaluateDto: CreateEvaluateDto, @CurrentUser('id') userId: Uuid): Promise<EvaluateResDto> {
    return this.evaluateService.create(createEvaluateDto, userId);
  }

  @ApiAuth({
    summary: 'Get all evaluations',
    type: EvaluateResDto,
  })
  @ApiResponse({ status: 200, type: [EvaluateResDto], description: 'List of evaluations retrieved successfully' })
  @Get()
  async findAll(@CurrentUser('id') userId: Uuid): Promise<EvaluateResDto[]> {
    return this.evaluateService.findAll(userId);
  }

  @ApiAuth({
    summary: 'Get evaluation by ID',
    type: EvaluateResDto,
  })
  @ApiResponse({ status: 200, type: EvaluateResDto, description: 'Evaluation retrieved successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the evaluation',
    type: 'string',
  })
  @Get(':id')
  async findOne(@Param('id', ValidateUuid) id: Uuid, @CurrentUser('id') userId: Uuid): Promise<EvaluateResDto> {
    return this.evaluateService.findOne(id, userId);
  }

  @ApiAuth({
    summary: 'Update evaluation by ID',
    type: EvaluateResDto,
  })
  @ApiResponse({ status: 200, type: EvaluateResDto, description: 'Evaluation updated successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the evaluation',
    type: 'string',
  })
  @Put(':id')
  @UsePipes(EvaluateValidationPipe)
  async update(
    @Param('id', ValidateUuid) id: Uuid,
    @Body() updateEvaluateDto: UpdateEvaluateDto,
    @CurrentUser('id') userId: Uuid,
  ): Promise<EvaluateResDto> {
    return this.evaluateService.update(id, updateEvaluateDto, userId);
  }

  @ApiAuth({
    summary: 'Delete evaluation by ID',
    statusCode: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({ status: 204, description: 'Evaluation deleted successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the evaluation',
    type: 'string',
  })
  @Delete(':id')
  async remove(@Param('id', ValidateUuid) id: Uuid, @CurrentUser('id') userId: Uuid): Promise<void> {
    return this.evaluateService.remove(id, userId);
  }
}