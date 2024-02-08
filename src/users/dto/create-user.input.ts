import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';
import { UserStatus } from '../enum/user-types.enum';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput {

  @Field(() => String, { nullable: true })
  @IsString()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;
  
  @Field(() => String)
  @IsString()
  password: string

  @Field(() => UserStatus, { defaultValue: UserStatus.User })
  @IsString()
  status: UserStatus

  @Field(() => [String])
  @IsArray()
  @IsString()
  roles: string []

  @Field(() => Boolean)
  @IsString()
  isActive: boolean

}
