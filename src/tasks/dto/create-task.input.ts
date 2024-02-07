import { InputType, Int, Field } from '@nestjs/graphql';
import { TaskStatus } from '../enum/task-status.enum';
import { IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsString()
  taskName: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.Todo, nullable: true })
  @IsString()
  taskStatus: TaskStatus;

}
