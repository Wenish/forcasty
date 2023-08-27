import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timeline } from './timeline.schema';
import { Document } from 'mongoose';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsString()
  owner: string;

  @Prop()
  @IsString()
  name: string;

  @Prop([Timeline])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Timeline)
  timeline: Timeline[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ updatedAt: -1 });
