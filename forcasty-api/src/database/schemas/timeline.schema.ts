import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  _id: false,
})
export class Timeline extends Document {
  @Prop()
  effort: number;

  @Prop()
  done: number;
}
