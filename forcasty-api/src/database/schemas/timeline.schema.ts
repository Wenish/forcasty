import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema({
  _id: false,
})
export class Timeline {
  @Prop()
  @IsNumber()
  effort: number;

  @Prop()
  @IsNumber()
  done: number;
}
