import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ProjectPatchDto } from './dtos/projectPatch.dto';
import { ProjectFilterDto } from './dtos/projectFilter.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterQuery, Model } from 'mongoose';
import { AUTH_GUARD_BEARER } from 'src/guards/bearer.guard';
import { AuthGuard } from '@nestjs/passport';
import { ProjectMembersPostDto } from './dtos/projectMembersPost.dto';
import { ProjectMemberPutDto } from './dtos/projectMemberPut.dto';
import { Member } from 'src/database/schemas/member.schema';
import { User } from 'src/decorators/user.decorator';
import { Action, CaslAbilityFactory } from 'src/casl/caslAbility.factory';
import { InjectModel } from '@nestjs/mongoose';
import { toMongoQuery } from '@casl/mongoose';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly projectsService: ProjectsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async post(@Body() projectCreateDto: ProjectCreateDto, @User() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const canCreateProject = ability.can(Action.CREATE, this.projectModel);

    if (!canCreateProject) throw new UnauthorizedException();

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
  async get(@Query() query: ProjectFilterDto, @User() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const canReadProjects = ability.can(Action.READ, this.projectModel);

    if (!canReadProjects) throw new UnauthorizedException();

    const filterQuery: FilterQuery<ProjectDocument> = {
      ...toMongoQuery(ability, this.projectModel, Action.READ),
    };
    if (query.owner) {
      filterQuery.owner = query.owner;
    }
    const result = await this.projectsService.findAll(filterQuery);
    return result as Project[];
  }

  @Get(':id')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);

    const canReadProject = ability.can(Action.READ, project);

    if (!canReadProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

    return project as Project;
  }

  @Patch(':id')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async patch(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() projectPatchDto: ProjectPatchDto,
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canUpdateProject = ability.can(Action.UPDATE, project);

    if (!canUpdateProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

    const projectUpdated = await this.projectsService.update(
      id,
      projectPatchDto,
    );
    return projectUpdated as Project;
  }

  @Delete(':id')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async remove(@Param('id', ParseObjectIdPipe) id: string, @User() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canDeleteProject = ability.can(Action.DELETE, project);

    if (!canDeleteProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

    const projectDeleted = await this.projectsService.remove(id);
    return projectDeleted as Project;
  }

  @Post(':id/members')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async postMembers(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() projectMembersPostDto: ProjectMembersPostDto,
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canUpdateProject = ability.can(Action.UPDATE, project);

    if (!canUpdateProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

    const members = await this.projectsService.addMembers(
      id,
      projectMembersPostDto,
    );
    return members as Member[];
  }

  @Get(':id/members')
  @UseGuards(AuthGuard([AUTH_GUARD_BEARER]))
  @ApiBearerAuth('Bearer Authentication')
  async getMembers(
    @Param('id', ParseObjectIdPipe) id: string,
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canReadProject = ability.can(Action.READ, project);

    if (!canReadProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

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
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canUpdateProject = ability.can(Action.UPDATE, project);

    if (!canUpdateProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

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
    @User() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project = await this.projectsService.findOne(id);
    const canUpdateProject = ability.can(Action.UPDATE, project);

    if (!canUpdateProject) throw new UnauthorizedException();
    if (!project) throw new NotFoundException();

    const members = await this.projectsService.removeMember(id, email);
    return members as Member[];
  }
}
