import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/database/schemas/project.schema';
import { User } from '../decorators/user.decorator';
import { Permission } from 'src/database/schemas/member.schema';

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);
    if (user) {
      const userEmail = user.email.toLocaleLowerCase();
      can(Action.READ, this.projectModel, {
        members: {
          $elemMatch: {
            email: userEmail,
          },
        },
      });

      can(Action.UPDATE, this.projectModel, {
        members: {
          $elemMatch: {
            email: userEmail,
            permissions: {
              $in: [Permission.EDITOR],
            },
          },
        },
      });

      can(Action.MANAGE, this.projectModel, {
        owner: user.uid,
      });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<
          InferSubjects<typeof this.projectModel> | 'all'
        >,
    });
  }
}

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
