import { PickType } from '@nestjs/swagger';
import { ProjectCreateDto } from './projectCreate.dto';

export class ProjectMembersPostDto extends PickType(ProjectCreateDto, [
  'members',
] as const) {}
