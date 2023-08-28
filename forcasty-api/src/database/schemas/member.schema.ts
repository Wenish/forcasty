import { Prop, Schema } from '@nestjs/mongoose';
import { ArrayUnique, IsEmail, IsEnum } from 'class-validator';

export enum Permission {
  READ = 'Read',
  EDITOR = 'Editor',
}

@Schema({
  _id: false,
})
export class Member {
  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  @ArrayUnique()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
