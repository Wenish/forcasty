import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { ProjectCreateDto } from './dtos/projectCreate.dto';
import { ProjectPatchDto } from './dtos/projectPatch.dto';
import { ProjectMembersPostDto } from './dtos/projectMembersPost.dto';
import { ProjectMemberPatchDto } from './dtos/projectMemberPatch.dto';

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

  async addMembers(id: string, projectMembersPostDto: ProjectMembersPostDto) {
    const projectCurrent = await this.findOne(id);

    const newMembersToAdd = projectMembersPostDto.members.filter(
      (member) =>
        !projectCurrent.members.find(
          (currentMember) => currentMember.email == member.email,
        ),
    );
    console.log(newMembersToAdd);
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          members: newMembersToAdd,
        },
      },
      {
        new: true,
      },
    );

    return project;
  }

  async updateMember(
    id: string,
    email: string,
    projectMemberPatch: ProjectMemberPatchDto,
  ) {
    const project = await this.projectModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        'members.email': email,
      },
      {
        $set: {
          'members.$.permissions': projectMemberPatch.permissions,
        },
      },
      {
        new: true,
      },
    );
    return project;
  }

  async removeMember(id: string, email: string) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          members: {
            email: email,
          },
        },
      },
      { new: true },
    );
    return project;
  }
}
