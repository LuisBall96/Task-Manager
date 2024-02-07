import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';
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

  @Field(() => UserStatus, { defaultValue: UserStatus.User })
  @IsString()
  status: UserStatus
}
