import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ProjectFilterDto {
  @IsString()
  @Type(() => String)
  @IsOptional()
  public owner = '';
}
