import { registerEnumType } from "@nestjs/graphql";

export enum UserRoles{
    superadmin = "superadmin",
    admin = "admin",
    user = "user"
} 

registerEnumType(UserRoles,{name:'UserRoles'});