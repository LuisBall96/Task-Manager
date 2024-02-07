import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enum/task-status.enum';

@Entity({ name: 'task' })
@ObjectType()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  taskName: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: TaskStatus.Todo })
  @Field(() => TaskStatus)
  taskStatus: TaskStatus; 
}
