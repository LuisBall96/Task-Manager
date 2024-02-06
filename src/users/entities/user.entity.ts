import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user'})
export class User {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => String)
  userName: string;
}
