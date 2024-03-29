import { IsString, IsUUID } from 'class-validator';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  @IsUUID()
  @IsString()
  id: string;
}
