import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  userName: string;
}
