import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ProjectPatchDto } from './dtos/projectPatch.dto';
import { ProjectFilterDto } from './dtos/projectFilter.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { AUTH_GUARD_BEARER } from 'guards/bearer.guard';
import { AuthGuard } from '@nestjs/passport';
import { ProjectMembersPostDto } from './dtos/projectMembersPost.dto';
import { ProjectMemberPutDto } from './dtos/projectMemberPut.dto';
import { Member } from 'src/database/schemas/member.schema';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async post(@Body() projectCreateDto: ProjectCreateDto) {
    const project = await this.projectsService.create(projectCreateDto);
    return project as Project;
  }

  @Get()
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
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
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const project = await this.projectsService.findOne(id);
    return project as Project;
  }

  @Patch(':id')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async patch(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() projectPatchDto: ProjectPatchDto,
  ) {
    const project = await this.projectsService.update(id, projectPatchDto);
    return project as Project;
  }

  @Delete(':id')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const project = await this.projectsService.remove(id);
    return project as Project;
  }

  @Post(':id/members')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async postMembers(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() projectMembersPostDto: ProjectMembersPostDto,
  ) {
    const members = await this.projectsService.addMembers(
      id,
      projectMembersPostDto,
    );
    return members as Member[];
  }

  @Get(':id/members')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async getMembers(@Param('id', ParseObjectIdPipe) id: string) {
    const members = await this.projectsService.getMembers(id);
    return members as Member[];
  }

  @Put(':id/members/:email')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async patchMember(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('email') email: string,
    @Body() projectMemberPutDto: ProjectMemberPutDto,
  ) {
    const members = await this.projectsService.updateMember(
      id,
      email,
      projectMemberPutDto,
    );
    return members as Member[];
  }

  @Delete(':id/members/:email')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async removeMember(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('email') email: string,
  ) {
    const members = await this.projectsService.removeMember(id, email);
    return members as Member[];
  }
}
