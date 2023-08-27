import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectsService } from './projects.service';
import { Project } from 'src/database/schemas/project.schema';
import { ProjectsResponseDto } from './dtos/projectsResponse.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async post(@Body() projectCreateDto: ProjectCreateDto) {
    const project = await this.projectsService.create(projectCreateDto);
    return project as Project;
  }

  @Get()
  async get() {
    const result = await this.projectsService.findAll();
    return result as ProjectsResponseDto;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
