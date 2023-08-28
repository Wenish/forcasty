import { PickType } from '@nestjs/swagger';
import { Member } from 'src/database/schemas/member.schema';

export class ProjectMemberPutDto extends PickType(Member, [
  'permissions',
] as const) {}
