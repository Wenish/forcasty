import { PartialType } from '@nestjs/swagger';
import { ProjectCreateDto } from './projectCreate.dto';

export class ProjectPatchDto extends PartialType(ProjectCreateDto) {}
