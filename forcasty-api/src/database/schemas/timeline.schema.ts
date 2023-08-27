import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Timeline {
  @Prop()
  effort: number;

  @Prop()
  done: number;
}
