import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../enum/user-types.enum';

@ObjectType()
@Entity({ name: 'user'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  lastName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({ default: UserStatus.User})
  @Field(() => UserStatus)
  status: UserStatus

  @Column('simple-array')
  @Field(() => [String])
  roles: string []

  @Column({ default: true })
  @Field(() => Boolean)
  isActive: boolean;



}
