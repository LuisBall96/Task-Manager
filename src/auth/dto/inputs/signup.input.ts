import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



@InputType()
export class SignupInput {

    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @Field(() => String)
    @MinLength(6)
    password: string;

    @Field(() => [String], { defaultValue: ['user'], nullable: true})
    @IsArray()
    roles: string []
  

}