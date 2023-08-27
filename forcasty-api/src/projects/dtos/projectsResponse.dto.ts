import { Project } from 'src/database/schemas/project.schema';

export class ProjectsResponseDto {
  results: Project[];
  count: number;
}
