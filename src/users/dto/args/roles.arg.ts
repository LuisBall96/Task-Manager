import { IsArray } from "class-validator";
import { UserRoles } from "../../../auth/enum/user-types.enum";
import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class UserRolesArgs {

    @Field(() => [UserRoles], { nullable: true })
    @IsArray()
    status: UserRoles[] = []
}