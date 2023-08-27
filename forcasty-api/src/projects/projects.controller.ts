import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ProjectPatchDto } from './dtos/projectPatch.dto';
import { ProjectFilterDto } from './dtos/projectFilter.dto';
import { ApiQuery } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async post(@Body() projectCreateDto: ProjectCreateDto) {
    const project = await this.projectsService.create(projectCreateDto);
    return project as Project;
  }

  @Get()
  @ApiQuery({
    name: 'owner',
    type: String,
    required: false,
    description: 'userId from the owner of the project',
  })
  async get(@Query() query: ProjectFilterDto) {
    const filterQuery: FilterQuery<ProjectDocument> = {};
    if (query.owner) {
      filterQuery.owner = query.owner;
    }
    const result = await this.projectsService.findAll(filterQuery);
    return result as Project[];
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const project = await this.projectsService.findOne(id);
    return project as Project;
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() projectPatchDto: ProjectPatchDto,
  ) {
    const project = await this.projectsService.update(id, projectPatchDto);
    return project as Project;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const project = await this.projectsService.remove(id);
    return project as Project;
  }
}
