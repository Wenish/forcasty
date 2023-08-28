import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [DatabaseModule, CaslModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [],
})
export class ProjectsModule {}
