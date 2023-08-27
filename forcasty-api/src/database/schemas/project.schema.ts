import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timeline } from './timeline.schema';
import { Document } from 'mongoose';

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
export class Project {
  _id: string;
  __v: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop()
  owner: string;

  @Prop()
  name: string;

  @Prop([Timeline])
  timeline: Timeline[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
