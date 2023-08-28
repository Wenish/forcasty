import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { BearerStrategy } from 'guards/bearer.guard';
import { AnonymousStrategy } from 'guards/anonymous.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [BearerStrategy, AnonymousStrategy],
})
export class AppModule {}
