import { OmitType } from '@nestjs/swagger';
import { Project } from 'src/database/schemas/project.schema';

export class ProjectCreateDto extends OmitType(Project, [
  '_id',
  '__v',
  'createdAt',
  'updatedAt',
] as const) {}
