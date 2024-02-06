import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user'})
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  userName: string;
}
