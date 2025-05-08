import { ActionList, ResourceList } from '@common/constants/app.constant';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiAuth } from '@common/decorators/http.decorators';
import { ValidateUuid } from '@common/decorators/validators/uuid-validator';
import { PermissionGuard } from '@common/guards/permission.guard';
import { Uuid } from '@common/types/common.type';
import { CreateCvReqDto } from '../dto/request/create-cv.req.dto';
import { UpdateCvReqDto } from '../dto/request/update-cv.req.dto';
import { CvResDto } from '../dto/response/cv.res.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CvService } from '../cv.service';

@ApiTags('CV APIs')
@Controller({
  path: 'cv',
  version: '1',
})
@UseGuards(PermissionGuard)
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @ApiAuth({
    summary: 'Create a new CV',
    type: CvResDto,
  })
  @ApiResponse({ status: 201, type: CvResDto, description: 'CV created successfully' })
  @Post()
  async create(@Body() createCvDto: CreateCvReqDto, @CurrentUser('id') userId: Uuid): Promise<CvResDto> {
    return this.cvService.create(createCvDto, userId);
  }

  @ApiAuth({
    summary: 'Get all CVs',
    type: CvResDto,
  })
  @ApiResponse({ status: 200, type: [CvResDto], description: 'List of CVs retrieved successfully' })
  @Get()
  async findAll(@CurrentUser('id') userId: Uuid): Promise<CvResDto[]> {
    return this.cvService.findAll(userId);
  }

  @ApiAuth({
    summary: 'Get CV detail by ID',
    type: CvResDto,
  })
  @ApiResponse({ status: 200, type: CvResDto, description: 'CV retrieved successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the CV',
    type: 'string',
  })
  @Get(':id')
  async findOne(@Param('id', ValidateUuid) id: Uuid, @CurrentUser('id') userId: Uuid): Promise<CvResDto> {
    return this.cvService.findOne(id, userId);
  }

  @ApiAuth({
    summary: 'Update CV by ID',
    type: CvResDto,
  })
  @ApiResponse({ status: 200, type: CvResDto, description: 'CV updated successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the CV',
    type: 'string',
  })
  @Put(':id')
  async update(@Param('id', ValidateUuid) id: Uuid, @Body() updateCvDto: UpdateCvReqDto, @CurrentUser('id') userId: Uuid): Promise<CvResDto> {
    return this.cvService.update(id, updateCvDto, userId);
  }

  @ApiAuth({
    summary: 'Delete CV by ID',
    statusCode: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({ status: 204, description: 'CV deleted successfully' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the CV',
    type: 'string',
  })
  @Delete(':id')
  async remove(@Param('id', ValidateUuid) id: Uuid, @CurrentUser('id') userId: Uuid): Promise<void> {
    return this.cvService.remove(id, userId);
  }
}