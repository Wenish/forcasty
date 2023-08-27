import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectPatchDto } from './dtos/projectPatch.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(projectCreateDto: ProjectCreateDto) {
    const newProject = new this.projectModel(projectCreateDto);
    const project = await newProject.save();
    return project;
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  async findAll(
    query: FilterQuery<ProjectDocument> = {},
    options: {
      skip?: number;
      limit?: number;
      sortType?: SortOrder;
      sortField?: string;
    } = {
      skip: null,
      limit: null,
      sortType: 'desc',
      sortField: 'createdAt',
    },
  ) {
    const mongoQuery = this.projectModel
      .find(query)
      .skip(options.skip)
      .limit(options.limit)
      .sort({ [options.sortField]: options.sortType });

    return await mongoQuery.exec();
  }

  async update(id: string, projectPatchDto: ProjectPatchDto) {
    return await this.projectModel.findByIdAndUpdate(id, projectPatchDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndRemove(id);
  }
}
