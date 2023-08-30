import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timeline } from './timeline.schema';
import { Document } from 'mongoose';
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Member } from './member.schema';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class Project extends Document {
  _id: string;
  __v: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop()
  @IsEmail()
  owner: string;

  @Prop()
  @IsString()
  name: string;

  @Prop([Timeline])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Timeline)
  timeline: Timeline[];

  @Prop([Member])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Member)
  members: Member[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ updatedAt: -1 });
