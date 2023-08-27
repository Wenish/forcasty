import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectsService } from './projects.service';
import { Project } from 'src/database/schemas/project.schema';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ProjectPatchDto } from './dtos/projectPatch.dto';

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
